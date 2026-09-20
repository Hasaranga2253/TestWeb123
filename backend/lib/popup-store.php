<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';

function aims_default_popup(): array
{
    return [
        'enabled' => true,
        'delay_ms' => 600,
        'frequency' => 'session',
        'eyebrow' => 'Admissions',
        'title' => 'New intake now open!',
        'message' => 'Limited seats available for this intake. Apply now to secure your place.',
        'primary_label' => 'Apply now',
        'primary_url' => '/contact',
        'secondary_label' => 'Maybe later',
        'image_url' => '',
        'image_alt' => 'New intake now open at AIMS Campus',
        'updated_at' => gmdate(DATE_ATOM),
    ];
}

function aims_read_popup(): array
{
    if (!is_file(AIMS_POPUP_DATA_FILE)) {
        return aims_default_popup();
    }

    $json = file_get_contents(AIMS_POPUP_DATA_FILE);
    $data = is_string($json) ? json_decode($json, true) : null;

    if (!is_array($data)) {
        return aims_default_popup();
    }

    return array_merge(aims_default_popup(), $data);
}

function aims_write_popup(array $popup): void
{
    $directory = dirname(AIMS_POPUP_DATA_FILE);

    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $popup['updated_at'] = gmdate(DATE_ATOM);
    $json = json_encode($popup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    if (!is_string($json)) {
        throw new RuntimeException('Could not encode popup settings.');
    }

    $temporaryFile = AIMS_POPUP_DATA_FILE . '.tmp';
    file_put_contents($temporaryFile, $json, LOCK_EX);
    rename($temporaryFile, AIMS_POPUP_DATA_FILE);
}

function aims_clean_text(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/\s+/', ' ', $value) ?? '';

    return mb_substr($value, 0, $maxLength);
}

function aims_clean_url(string $value): string
{
    $value = trim($value);

    if ($value === '') {
        return '/contact';
    }

    if (str_starts_with($value, '/')) {
        return mb_substr($value, 0, 300);
    }

    $parts = parse_url($value);

    if (!is_array($parts) || !isset($parts['scheme'])) {
        return '/contact';
    }

    $scheme = strtolower((string) $parts['scheme']);

    if (!in_array($scheme, ['http', 'https'], true)) {
        return '/contact';
    }

    return mb_substr($value, 0, 300);
}

function aims_clean_optional_url(string $value): string
{
    $value = trim($value);

    if ($value === '') {
        return '';
    }

    return aims_clean_url($value);
}

function aims_public_popup(array $popup): array
{
    return [
        'enabled' => (bool) $popup['enabled'],
        'delayMs' => max(0, min(10000, (int) $popup['delay_ms'])),
        'frequency' => $popup['frequency'] === 'always' ? 'always' : 'session',
        'eyebrow' => aims_clean_text((string) $popup['eyebrow'], 40),
        'title' => aims_clean_text((string) $popup['title'], 90),
        'message' => aims_clean_text((string) $popup['message'], 220),
        'primaryLabel' => aims_clean_text((string) $popup['primary_label'], 40),
        'primaryUrl' => aims_clean_url((string) $popup['primary_url']),
        'secondaryLabel' => aims_clean_text((string) $popup['secondary_label'], 40),
        'imageUrl' => aims_clean_optional_url((string) $popup['image_url']),
        'imageAlt' => aims_clean_text((string) $popup['image_alt'], 120),
        'updatedAt' => aims_clean_text((string) $popup['updated_at'], 40),
    ];
}
