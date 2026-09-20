<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

$error = '';
$adminPassword = aims_admin_password();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    aims_verify_csrf();

    $username = isset($_POST['username']) ? trim((string) $_POST['username']) : '';
    $password = isset($_POST['password']) ? (string) $_POST['password'] : '';

    if ($adminPassword !== null && $username === 'admin' && hash_equals($adminPassword, $password)) {
        session_regenerate_id(true);
        $_SESSION['aims_popup_admin'] = true;
        header('Location: dashboard.php');
        exit;
    }

    $error = 'Invalid username or password.';
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AIMS Popup Admin Login</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="auth-card">
    <div class="brand auth-brand">
      <div class="brand-mark">AIMS</div>
      <div>
        <p class="eyebrow">Secure Admin</p>
        <h1>AIMS Popup Admin</h1>
      </div>
    </div>
    <p class="hero-copy">Sign in to manage the homepage popup content, display timing, and popup image.</p>

    <?php if ($adminPassword === null): ?>
      <div class="alert error">Admin login is disabled. Set <code>AIMS_ADMIN_PASSWORD</code> to a strong password with at least 12 characters.</div>
    <?php endif; ?>

    <?php if ($error !== ''): ?>
      <div class="alert error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <form method="post" autocomplete="off">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
      <label>
        Username
        <input name="username" value="admin" required>
      </label>
      <label>
        Password
        <input type="password" name="password" required>
      </label>
      <button type="submit" <?= $adminPassword === null ? 'disabled' : '' ?>>Sign in</button>
    </form>
  </main>
</body>
</html>
