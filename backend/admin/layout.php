<?php

declare(strict_types=1);

function aims_admin_header(string $title, string $active = 'dashboard'): void
{
    $host = (string) ($_SERVER['HTTP_HOST'] ?? '');
    $websiteUrl = str_starts_with($host, 'localhost:8000') || str_starts_with($host, '127.0.0.1:8000')
        ? 'http://localhost:5174'
        : '/';

    $items = [
        'dashboard' => ['label' => 'Dashboard', 'href' => 'dashboard.php'],
        'popup' => ['label' => 'Popup Manager', 'href' => 'index.php'],
        'slider' => ['label' => 'Hero Slider', 'href' => 'slider.php'],
        'news' => ['label' => 'News Images', 'href' => 'news.php'],
        'enquiries' => ['label' => 'Enquiries', 'href' => 'enquiries.php'],
    ];
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?> | AIMS Admin</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="admin-shell">
    <aside class="sidebar">
      <a class="sidebar-brand" href="dashboard.php" aria-label="AIMS Admin Dashboard">
        <span>AIMS</span>
        <strong>Campus Admin</strong>
      </a>
      <nav class="sidebar-nav" aria-label="Admin navigation">
        <?php foreach ($items as $key => $item): ?>
          <a class="<?= $active === $key ? 'active' : '' ?>" href="<?= htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8') ?>">
            <?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8') ?>
          </a>
        <?php endforeach; ?>
      </nav>
      <div class="sidebar-note">
        <strong>Safe mode</strong>
        <span>Only backend admin files and popup settings are editable now.</span>
      </div>
    </aside>

    <section class="admin-main">
      <header class="admin-topbar">
        <div>
          <p class="eyebrow">AIMS Campus Admin</p>
          <h1><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
        </div>
        <div class="hero-actions">
          <a class="ghost-link" href="<?= htmlspecialchars($websiteUrl, ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noreferrer">View Website</a>
          <a class="logout" href="logout.php">Logout</a>
        </div>
      </header>
<?php
}

function aims_admin_footer(?string $script = null): void
{
    if ($script !== null): ?>
      <script src="<?= htmlspecialchars($script, ENT_QUOTES, 'UTF-8') ?>" defer></script>
<?php endif; ?>
    </section>
  </main>
</body>
</html>
<?php
}
