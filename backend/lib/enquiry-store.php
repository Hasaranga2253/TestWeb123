<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/popup-store.php';

function aims_database(): PDO
{
    $directory = dirname(AIMS_DATABASE_FILE);

    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $pdo = new PDO('sqlite:' . AIMS_DATABASE_FILE, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $pdo->exec('PRAGMA foreign_keys = ON');
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            campus TEXT NOT NULL,
            programme TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT "new",
            ip_address TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL
        )',
    );

    return $pdo;
}

function aims_clean_email(string $value): string
{
    return mb_substr(trim($value), 0, 160);
}

function aims_normalize_select_value(string $value, array $allowed): string
{
    $value = trim($value);

    if (!in_array($value, $allowed, true)) {
        throw new RuntimeException('Invalid form selection.');
    }

    return $value;
}

function aims_create_enquiry(array $input, string $ipAddress, string $userAgent): int
{
    $fullName = aims_clean_text((string) ($input['fullName'] ?? ''), 120);
    $phone = aims_clean_text((string) ($input['phone'] ?? ''), 40);
    $email = aims_clean_email((string) ($input['email'] ?? ''));
    $campus = aims_normalize_select_value((string) ($input['campus'] ?? ''), ['colombo-07', 'negombo', 'not-sure']);
    $programme = aims_normalize_select_value((string) ($input['programme'] ?? ''), ['foundation', 'diploma', 'bachelors', 'masters', 'doctoral', 'professional', 'english', 'not-sure']);
    $subject = aims_clean_text((string) ($input['subject'] ?? ''), 140);
    $message = aims_clean_text((string) ($input['message'] ?? ''), 1200);

    if ($fullName === '' || $phone === '' || $email === '' || $subject === '' || $message === '') {
        throw new RuntimeException('Please complete all required fields.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Please enter a valid email address.');
    }

    $pdo = aims_database();
    $statement = $pdo->prepare(
        'INSERT INTO enquiries (
            full_name, phone, email, campus, programme, subject, message,
            ip_address, user_agent, created_at
        ) VALUES (
            :full_name, :phone, :email, :campus, :programme, :subject, :message,
            :ip_address, :user_agent, :created_at
        )',
    );

    $statement->execute([
        ':full_name' => $fullName,
        ':phone' => $phone,
        ':email' => $email,
        ':campus' => $campus,
        ':programme' => $programme,
        ':subject' => $subject,
        ':message' => $message,
        ':ip_address' => mb_substr($ipAddress, 0, 80),
        ':user_agent' => mb_substr($userAgent, 0, 240),
        ':created_at' => gmdate(DATE_ATOM),
    ]);

    return (int) $pdo->lastInsertId();
}

function aims_list_enquiries(int $limit = 100): array
{
    $pdo = aims_database();
    $statement = $pdo->prepare('SELECT * FROM enquiries ORDER BY id DESC LIMIT :limit');
    $statement->bindValue(':limit', max(1, min(200, $limit)), PDO::PARAM_INT);
    $statement->execute();

    return $statement->fetchAll();
}
