<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/media-store.php';
require_once __DIR__ . '/../lib/api-headers.php';

aims_send_api_headers();

echo json_encode(aims_read_news_images(), JSON_UNESCAPED_SLASHES);
