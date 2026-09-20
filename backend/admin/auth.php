<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';

if (!is_dir(AIMS_SESSION_DIR)) {
    mkdir(AIMS_SESSION_DIR, 0755, true);
}

session_save_path(AIMS_SESSION_DIR);
session_name('aims_popup_admin');
session_start([
    'cookie_httponly' => true,
    'cookie_secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'cookie_samesite' => 'Strict',
    'cookie_path' => '/backend/admin',
    'use_strict_mode' => true,
]);

function aims_is_admin(): bool
{
    return isset($_SESSION['aims_popup_admin']) && $_SESSION['aims_popup_admin'] === true;
}

function aims_require_admin(): void
{
    if (!aims_is_admin()) {
        header('Location: login.php');
        exit;
    }
}

function aims_csrf_token(): string
{
    if (!isset($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function aims_verify_csrf(): void
{
    $token = $_POST['csrf_token'] ?? '';

    if (!is_string($token) || !hash_equals(aims_csrf_token(), $token)) {
        http_response_code(419);
        exit('Invalid request token.');
    }
}
