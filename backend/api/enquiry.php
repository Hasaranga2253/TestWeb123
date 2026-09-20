<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/enquiry-store.php';
require_once __DIR__ . '/../lib/api-headers.php';

aims_send_api_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

$contentType = (string) ($_SERVER['CONTENT_TYPE'] ?? '');
$input = [];

if (str_contains($contentType, 'application/json')) {
    $rawBody = file_get_contents('php://input');
    $decoded = is_string($rawBody) ? json_decode($rawBody, true) : null;
    $input = is_array($decoded) ? $decoded : [];
} else {
    $input = $_POST;
}

try {
    $id = aims_create_enquiry(
        $input,
        (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
        (string) ($_SERVER['HTTP_USER_AGENT'] ?? ''),
    );

    echo json_encode(['ok' => true, 'id' => $id, 'message' => 'Enquiry saved successfully.']);
} catch (Throwable $exception) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => $exception->getMessage()]);
}
