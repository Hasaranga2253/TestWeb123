<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/../lib/popup-store.php';

aims_require_admin();

$popup = aims_read_popup();
$message = '';
$error = '';

function aims_handle_upload(array $currentPopup): string
{
    if (!isset($_FILES['popup_image']) || !is_array($_FILES['popup_image'])) {
        return (string) $currentPopup['image_url'];
    }

    $file = $_FILES['popup_image'];

    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return (string) $currentPopup['image_url'];
    }

    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Image upload failed.');
    }

    if (($file['size'] ?? 0) > AIMS_MAX_UPLOAD_BYTES) {
        throw new RuntimeException('Image must be 2MB or smaller.');
    }

    $temporaryName = (string) ($file['tmp_name'] ?? '');
    $info = @getimagesize($temporaryName);

    if ($info === false) {
        throw new RuntimeException('Uploaded file is not a valid image.');
    }

    $allowed = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG => 'png',
        IMAGETYPE_WEBP => 'webp',
    ];

    $imageType = (int) ($info[2] ?? 0);

    if (!isset($allowed[$imageType])) {
        throw new RuntimeException('Only JPG, PNG, and WEBP images are allowed.');
    }

    if (!is_dir(AIMS_POPUP_UPLOAD_DIR)) {
        mkdir(AIMS_POPUP_UPLOAD_DIR, 0755, true);
    }

    $fileName = 'popup-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$imageType];
    $destination = AIMS_POPUP_UPLOAD_DIR . '/' . $fileName;

    if (!move_uploaded_file($temporaryName, $destination)) {
        throw new RuntimeException('Could not save uploaded image.');
    }

    return AIMS_POPUP_UPLOAD_URL . '/' . $fileName;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    aims_verify_csrf();

    try {
        $popup = [
            'enabled' => isset($_POST['enabled']),
            'delay_ms' => max(0, min(10000, (int) ($_POST['delay_ms'] ?? 600))),
            'frequency' => ($_POST['frequency'] ?? 'session') === 'always' ? 'always' : 'session',
            'eyebrow' => aims_clean_text((string) ($_POST['eyebrow'] ?? ''), 40),
            'title' => aims_clean_text((string) ($_POST['title'] ?? ''), 90),
            'message' => aims_clean_text((string) ($_POST['message'] ?? ''), 220),
            'primary_label' => aims_clean_text((string) ($_POST['primary_label'] ?? ''), 40),
            'primary_url' => aims_clean_url((string) ($_POST['primary_url'] ?? '/contact')),
            'secondary_label' => aims_clean_text((string) ($_POST['secondary_label'] ?? ''), 40),
            'image_url' => aims_handle_upload($popup),
            'image_alt' => aims_clean_text((string) ($_POST['image_alt'] ?? ''), 120),
            'updated_at' => (string) ($popup['updated_at'] ?? gmdate(DATE_ATOM)),
        ];

        aims_write_popup($popup);
        $message = 'Popup settings saved successfully.';
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
    }
}

$publicPopup = aims_public_popup($popup);
?>
<?php aims_admin_header('Homepage Popup Control', 'popup'); ?>

    <section class="dashboard-hero compact">
      <div>
        <p class="eyebrow">Connected Module</p>
        <h2>Popup Manager</h2>
        <p>Manage the admission popup message, display timing, button link, and image without touching the main website code.</p>
      </div>
      <a class="ghost-link" href="dashboard.php">Back to Dashboard</a>
    </section>

    <?php if ($message !== ''): ?>
      <div class="alert success"><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <?php if ($error !== ''): ?>
      <div class="alert error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <section class="status-grid" aria-label="Popup status summary">
      <article class="status-card">
        <span>Status</span>
        <strong class="<?= $publicPopup['enabled'] ? 'text-success' : 'text-muted' ?>"><?= $publicPopup['enabled'] ? 'Live' : 'Hidden' ?></strong>
      </article>
      <article class="status-card">
        <span>Frequency</span>
        <strong><?= $publicPopup['frequency'] === 'always' ? 'Every Load' : 'Once Per Session' ?></strong>
      </article>
      <article class="status-card">
        <span>Delay</span>
        <strong><?= htmlspecialchars((string) $publicPopup['delayMs'], ENT_QUOTES, 'UTF-8') ?> ms</strong>
      </article>
      <article class="status-card">
        <span>Image</span>
        <strong><?= $publicPopup['imageUrl'] !== '' ? 'Custom' : 'Default' ?></strong>
      </article>
    </section>

    <section class="grid">
      <form class="panel" method="post" enctype="multipart/form-data">
        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">

        <div class="panel-header">
          <div>
            <p class="eyebrow">Settings</p>
            <h2>Popup Content</h2>
          </div>
          <label class="switch">
            <input type="checkbox" name="enabled" <?= $publicPopup['enabled'] ? 'checked' : '' ?>>
            <span></span>
            Display popup
          </label>
        </div>

        <div class="form-section">
          <h3>Display Rules</h3>
          <div class="two">
            <label>
              Display frequency
              <select name="frequency">
                <option value="session" <?= $publicPopup['frequency'] === 'session' ? 'selected' : '' ?>>Once per browser session</option>
                <option value="always" <?= $publicPopup['frequency'] === 'always' ? 'selected' : '' ?>>Every page load</option>
              </select>
              <small>Recommended: once per session, so visitors are not disturbed repeatedly.</small>
            </label>

            <label>
              Delay before display
              <input type="number" name="delay_ms" min="0" max="10000" value="<?= htmlspecialchars((string) $publicPopup['delayMs'], ENT_QUOTES, 'UTF-8') ?>">
              <small>Value is milliseconds. Example: 600 = 0.6 seconds.</small>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3>Text Content</h3>
          <label>
            Small heading
            <input name="eyebrow" maxlength="40" value="<?= htmlspecialchars($publicPopup['eyebrow'], ENT_QUOTES, 'UTF-8') ?>">
          </label>

          <label>
            Main title
            <input name="title" maxlength="90" value="<?= htmlspecialchars($publicPopup['title'], ENT_QUOTES, 'UTF-8') ?>">
          </label>

          <label>
            Message
            <textarea name="message" maxlength="220"><?= htmlspecialchars($publicPopup['message'], ENT_QUOTES, 'UTF-8') ?></textarea>
          </label>
        </div>

        <div class="form-section">
          <h3>Buttons</h3>
          <div class="two">
            <label>
              Main button label
              <input name="primary_label" maxlength="40" value="<?= htmlspecialchars($publicPopup['primaryLabel'], ENT_QUOTES, 'UTF-8') ?>">
            </label>
            <label>
              Main button URL
              <input name="primary_url" maxlength="300" value="<?= htmlspecialchars($publicPopup['primaryUrl'], ENT_QUOTES, 'UTF-8') ?>">
              <small>Use website paths like /contact or safe https links.</small>
            </label>
          </div>

          <label>
            Secondary button label
            <input name="secondary_label" maxlength="40" value="<?= htmlspecialchars($publicPopup['secondaryLabel'], ENT_QUOTES, 'UTF-8') ?>">
          </label>
        </div>

        <div class="form-section">
          <h3>Image</h3>
          <label class="upload-box">
            Popup image
            <input type="file" name="popup_image" accept="image/jpeg,image/png,image/webp">
            <small>JPG, PNG, or WEBP only. Maximum upload size is 2MB.</small>
          </label>

          <label>
            Image alt text
            <input name="image_alt" maxlength="120" value="<?= htmlspecialchars($publicPopup['imageAlt'], ENT_QUOTES, 'UTF-8') ?>">
          </label>
        </div>

        <div class="save-bar">
          <button type="submit">Save popup settings</button>
          <span>Changes apply after saving and refreshing the website.</span>
        </div>
      </form>

      <aside class="panel preview">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Live Preview</p>
            <h2>Visitor View</h2>
          </div>
          <span class="preview-pill">Desktop</span>
        </div>

        <div class="phone-frame">
          <div class="popup-card">
            <?php if ($publicPopup['imageUrl'] !== ''): ?>
              <img data-preview-image src="<?= htmlspecialchars($publicPopup['imageUrl'], ENT_QUOTES, 'UTF-8') ?>" alt="">
            <?php else: ?>
              <div data-preview-placeholder class="placeholder">Using website default image until an admin image is uploaded.</div>
            <?php endif; ?>
            <div class="popup-body">
              <p data-preview="eyebrow" class="preview-eyebrow"><?= htmlspecialchars($publicPopup['eyebrow'], ENT_QUOTES, 'UTF-8') ?></p>
              <h2 data-preview="title"><?= htmlspecialchars($publicPopup['title'], ENT_QUOTES, 'UTF-8') ?></h2>
              <p data-preview="message"><?= htmlspecialchars($publicPopup['message'], ENT_QUOTES, 'UTF-8') ?></p>
              <div class="actions">
                <span data-preview="primary_label"><?= htmlspecialchars($publicPopup['primaryLabel'], ENT_QUOTES, 'UTF-8') ?></span>
                <span data-preview="secondary_label" class="secondary"><?= htmlspecialchars($publicPopup['secondaryLabel'], ENT_QUOTES, 'UTF-8') ?></span>
              </div>
            </div>
          </div>
        </div>

        <div class="tips">
          <h3>Safe Editing Tips</h3>
          <ul>
            <li>Use short popup titles for mobile readability.</li>
            <li>Upload compressed images below 2MB.</li>
            <li>Use <code>/contact</code> for internal application links.</li>
          </ul>
        </div>
      </aside>
    </section>
<?php aims_admin_footer('admin.js'); ?>
