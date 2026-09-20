<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/../lib/media-store.php';

aims_require_admin();

$message = '';
$error = '';
$albums = [
    'uel' => 'University of East London Partnership Highlights',
    'orientation' => 'Student Orientation & Welcome Sessions',
    'graduation' => 'Graduation Ceremony 2025',
    'phd-evening' => 'PhD Evening',
    'edex-edu' => 'EDEX Education Expo',
    'aims-new-year' => 'AIMS New Year Festival 2024',
];
$albumMeta = [];

foreach ($albums as $id => $title) {
    $albumMeta[$id] = ['title' => $title, 'category' => 'Existing Album'];
}

$newsData = aims_read_news_images();
$customAlbums = is_array($newsData['customAlbums'] ?? null) ? $newsData['customAlbums'] : [];

foreach ($customAlbums as $id => $album) {
    if (!is_array($album)) {
        continue;
    }

    $title = aims_clean_text((string) ($album['title'] ?? ''), 90);

    if ($title === '') {
        continue;
    }

    $albums[(string) $id] = $title;
    $albumMeta[(string) $id] = [
        'title' => $title,
        'category' => aims_clean_text((string) ($album['category'] ?? 'Custom Album'), 40),
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    aims_verify_csrf();

    try {
        $action = (string) ($_POST['action'] ?? 'add_image');

        if ($action === 'create_album') {
            $newAlbumId = aims_add_news_album(
                (string) ($_POST['album_title'] ?? ''),
                (string) ($_POST['album_category'] ?? ''),
                (string) ($_POST['album_summary'] ?? ''),
            );

            $message = 'New album created successfully.';
            $newsData = aims_read_news_images();
            $customAlbums = is_array($newsData['customAlbums'] ?? null) ? $newsData['customAlbums'] : [];
            $newAlbum = is_array($customAlbums[$newAlbumId] ?? null) ? $customAlbums[$newAlbumId] : null;

            if ($newAlbum !== null) {
                $albums[$newAlbumId] = (string) $newAlbum['title'];
                $albumMeta[$newAlbumId] = [
                    'title' => (string) $newAlbum['title'],
                    'category' => (string) $newAlbum['category'],
                ];
            }
        } else {
            $albumId = (string) ($_POST['album_id'] ?? '');

            if (!isset($albums[$albumId])) {
                throw new RuntimeException('Invalid news album selected.');
            }

            $imageUrl = aims_validate_image_upload($_FILES['news_image'] ?? [], AIMS_NEWS_UPLOAD_DIR, AIMS_NEWS_UPLOAD_URL, 'news-' . $albumId);
            $alt = aims_clean_text((string) ($_POST['image_alt'] ?? $albums[$albumId]), 140);

            aims_add_news_image($albumId, $imageUrl, $alt);
            $message = 'News image added successfully.';
        }
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
    }
}

$newsData = aims_read_news_images();
$uploadedAlbums = is_array($newsData['albums'] ?? null) ? $newsData['albums'] : [];
$customAlbums = is_array($newsData['customAlbums'] ?? null) ? $newsData['customAlbums'] : [];

aims_admin_header('News Images Manager', 'news');
?>
      <section class="dashboard-hero compact">
        <div>
          <p class="eyebrow">Connected Module</p>
          <h2>News & Updates Gallery Uploads</h2>
          <p>Add new albums or upload images to News & Updates. Existing website images stay untouched.</p>
        </div>
        <a class="ghost-link" href="dashboard.php">Back to Dashboard</a>
      </section>

      <?php if ($message !== ''): ?>
        <div class="alert success"><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></div>
      <?php endif; ?>

      <?php if ($error !== ''): ?>
        <div class="alert error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
      <?php endif; ?>

      <section class="grid">
        <form class="panel" method="post">
          <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
          <input type="hidden" name="action" value="create_album">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Create</p>
              <h2>Add New Album</h2>
            </div>
          </div>

          <label>
            Album title
            <input name="album_title" maxlength="90" placeholder="Example: Open Day 2026" required>
          </label>

          <label>
            Category
            <input name="album_category" maxlength="40" placeholder="Example: Open Day" required>
          </label>

          <label>
            Album summary
            <textarea name="album_summary" maxlength="220" placeholder="Short description shown on the News & Updates page."></textarea>
          </label>

          <div class="save-bar">
            <button type="submit">Create album</button>
            <span>Create the album first, then upload images to it.</span>
          </div>
        </form>

        <form class="panel" method="post" enctype="multipart/form-data">
          <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
          <input type="hidden" name="action" value="add_image">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Upload</p>
              <h2>Add News Image</h2>
            </div>
          </div>

          <label>
            Choose album
            <select name="album_id">
              <?php foreach ($albums as $id => $title): ?>
                <option value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></option>
              <?php endforeach; ?>
            </select>
          </label>

          <label class="upload-box">
            New gallery image
            <input type="file" name="news_image" accept="image/jpeg,image/png,image/webp" required>
            <small>JPG, PNG, or WEBP only. Maximum 2MB.</small>
          </label>

          <label>
            Image alt text
            <input name="image_alt" maxlength="140" value="AIMS Campus news gallery image">
          </label>

          <div class="save-bar">
            <button type="submit">Add image to gallery</button>
            <span>Images appear after refreshing News & Updates.</span>
          </div>
        </form>
      </section>

      <section class="panel wide-panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Uploaded</p>
            <h2>Admin Gallery Albums</h2>
          </div>
        </div>
        <div class="admin-image-list album-grid">
          <?php foreach ($albums as $id => $title): ?>
            <?php $images = is_array($uploadedAlbums[$id] ?? null) ? $uploadedAlbums[$id] : []; ?>
            <article>
              <strong><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></strong>
              <span><?= htmlspecialchars((string) ($albumMeta[$id]['category'] ?? 'Album'), ENT_QUOTES, 'UTF-8') ?> · <?= count($images) ?> admin uploads</span>
              <?php if (str_starts_with((string) $id, 'admin-')): ?>
                <span>Custom album</span>
              <?php endif; ?>
              <?php if (count($images) > 0): ?>
                <div class="thumb-row">
                  <?php foreach (array_slice($images, -3) as $image): ?>
                    <img src="<?= htmlspecialchars((string) ($image['src'] ?? ''), ENT_QUOTES, 'UTF-8') ?>" alt="">
                  <?php endforeach; ?>
                </div>
              <?php endif; ?>
            </article>
          <?php endforeach; ?>
        </div>
      </section>
<?php
aims_admin_footer();
