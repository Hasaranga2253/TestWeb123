<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/popup-store.php';

const AIMS_SLIDER_DATA_FILE = AIMS_BACKEND_BASE . '/data/slider.json';
const AIMS_NEWS_DATA_FILE = AIMS_BACKEND_BASE . '/data/news-images.json';
const AIMS_SLIDER_UPLOAD_DIR = AIMS_BACKEND_BASE . '/uploads/slider';
const AIMS_NEWS_UPLOAD_DIR = AIMS_BACKEND_BASE . '/uploads/news';
const AIMS_SLIDER_UPLOAD_URL = '/backend/uploads/slider';
const AIMS_NEWS_UPLOAD_URL = '/backend/uploads/news';

function aims_read_json_file(string $file, array $default): array
{
    if (!is_file($file)) {
        return $default;
    }

    $json = file_get_contents($file);
    $data = is_string($json) ? json_decode($json, true) : null;

    return is_array($data) ? $data : $default;
}

function aims_write_json_file(string $file, array $data): void
{
    $directory = dirname($file);

    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    if (!is_string($json)) {
        throw new RuntimeException('Could not encode data.');
    }

    $temporaryFile = $file . '.tmp';
    file_put_contents($temporaryFile, $json, LOCK_EX);
    rename($temporaryFile, $file);
}

function aims_validate_image_upload(array $file, string $uploadDirectory, string $uploadUrl, string $prefix): string
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        throw new RuntimeException('Please choose an image to upload.');
    }

    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Image upload failed.');
    }

    if (($file['size'] ?? 0) > AIMS_MAX_UPLOAD_BYTES) {
        throw new RuntimeException('Image must be 2MB or smaller.');
    }

    $temporaryName = (string) ($file['tmp_name'] ?? '');
    $info = @getimagesize($temporaryName);

    if ($info === false) {
        throw new RuntimeException('Uploaded file is not a valid image.');
    }

    $allowed = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG => 'png',
        IMAGETYPE_WEBP => 'webp',
    ];

    $imageType = (int) ($info[2] ?? 0);

    if (!isset($allowed[$imageType])) {
        throw new RuntimeException('Only JPG, PNG, and WEBP images are allowed.');
    }

    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0755, true);
    }

    $fileName = $prefix . '-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$imageType];
    $destination = $uploadDirectory . '/' . $fileName;

    if (!move_uploaded_file($temporaryName, $destination)) {
        throw new RuntimeException('Could not save uploaded image.');
    }

    return $uploadUrl . '/' . $fileName;
}

function aims_read_slider_images(): array
{
    return aims_read_json_file(AIMS_SLIDER_DATA_FILE, ['slides' => []]);
}

function aims_write_slider_image(int $slideIndex, string $imageUrl, string $imageAlt): void
{
    $data = aims_read_slider_images();
    $slides = is_array($data['slides'] ?? null) ? $data['slides'] : [];
    $slides[(string) $slideIndex] = [
        'imageUrl' => aims_clean_optional_url($imageUrl),
        'imageAlt' => aims_clean_text($imageAlt, 120),
        'updatedAt' => gmdate(DATE_ATOM),
    ];
    $data['slides'] = $slides;
    aims_write_json_file(AIMS_SLIDER_DATA_FILE, $data);
}

function aims_read_news_images(): array
{
    return aims_read_json_file(AIMS_NEWS_DATA_FILE, ['albums' => [], 'customAlbums' => []]);
}

function aims_slugify_album_id(string $title): string
{
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    $slug = trim($slug, '-');

    if ($slug === '') {
        $slug = 'album';
    }

    return 'admin-' . mb_substr($slug, 0, 48);
}

function aims_add_news_album(string $title, string $category, string $summary): string
{
    $data = aims_read_news_images();
    $customAlbums = is_array($data['customAlbums'] ?? null) ? $data['customAlbums'] : [];
    $baseId = aims_slugify_album_id($title);
    $albumId = $baseId;
    $counter = 2;

    while (isset($customAlbums[$albumId])) {
        $albumId = $baseId . '-' . $counter;
        $counter++;
    }

    $cleanTitle = aims_clean_text($title, 90);
    $cleanCategory = aims_clean_text($category !== '' ? $category : 'Campus Update', 40);

    if ($cleanTitle === '') {
        throw new RuntimeException('Album title is required.');
    }

    $customAlbums[$albumId] = [
        'id' => $albumId,
        'category' => $cleanCategory,
        'title' => $cleanTitle,
        'summary' => aims_clean_text($summary, 220),
        'dateLabel' => 'Latest update',
        'location' => 'AIMS Campus',
        'tag' => $cleanCategory,
        'folder' => 'Admin Uploads',
        'createdAt' => gmdate(DATE_ATOM),
    ];

    $data['customAlbums'] = $customAlbums;
    aims_write_json_file(AIMS_NEWS_DATA_FILE, $data);

    return $albumId;
}

function aims_add_news_image(string $albumId, string $imageUrl, string $alt): void
{
    $data = aims_read_news_images();
    $albums = is_array($data['albums'] ?? null) ? $data['albums'] : [];
    $images = is_array($albums[$albumId] ?? null) ? $albums[$albumId] : [];
    $images[] = [
        'src' => aims_clean_optional_url($imageUrl),
        'alt' => aims_clean_text($alt, 140),
        'fileName' => basename($imageUrl),
        'uploadedAt' => gmdate(DATE_ATOM),
    ];
    $albums[$albumId] = $images;
    $data['albums'] = $albums;
    aims_write_json_file(AIMS_NEWS_DATA_FILE, $data);
}
