<?php

declare(strict_types=1);

const AIMS_BACKEND_BASE = __DIR__;
const AIMS_POPUP_DATA_FILE = AIMS_BACKEND_BASE . '/data/popup.json';
const AIMS_DATABASE_FILE = AIMS_BACKEND_BASE . '/data/aims-admin.sqlite';
const AIMS_POPUP_UPLOAD_DIR = AIMS_BACKEND_BASE . '/uploads/popup';
const AIMS_POPUP_UPLOAD_URL = '/backend/uploads/popup';
const AIMS_SESSION_DIR = AIMS_BACKEND_BASE . '/sessions';
const AIMS_ENV_FILE = AIMS_BACKEND_BASE . '/.env';
const AIMS_MAX_UPLOAD_BYTES = 2097152;

function aims_env_value(string $key): ?string
{
    $value = getenv($key);

    if (is_string($value) && $value !== '') {
        return $value;
    }

    if (!is_file(AIMS_ENV_FILE)) {
        return null;
    }

    $lines = file(AIMS_ENV_FILE, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    if (!is_array($lines)) {
        return null;
    }

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$name, $rawValue] = explode('=', $line, 2);

        if (trim($name) !== $key) {
            continue;
        }

        return trim($rawValue, " \t\n\r\0\x0B\"'");
    }

    return null;
}

function aims_admin_password(): ?string
{
    $password = aims_env_value('AIMS_ADMIN_PASSWORD');

    if (!is_string($password) || strlen($password) < 12) {
        return null;
    }

    return $password;
}
