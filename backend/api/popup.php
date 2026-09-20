<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/popup-store.php';
require_once __DIR__ . '/../lib/api-headers.php';

aims_send_api_headers();

echo json_encode(aims_public_popup(aims_read_popup()), JSON_UNESCAPED_SLASHES);
