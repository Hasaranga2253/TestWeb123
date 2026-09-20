<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/../lib/media-store.php';

aims_require_admin();

$message = '';
$error = '';
$slideLabels = [
    0 => 'Slide 1 - Main hero',
    1 => 'Slide 2 - UK recognised degrees',
    2 => 'Slide 3 - Admissions open',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    aims_verify_csrf();

    try {
        $slideIndex = max(0, min(2, (int) ($_POST['slide_index'] ?? 0)));
        $imageUrl = aims_validate_image_upload($_FILES['slider_image'] ?? [], AIMS_SLIDER_UPLOAD_DIR, AIMS_SLIDER_UPLOAD_URL, 'hero-slide-' . ($slideIndex + 1));
        $imageAlt = aims_clean_text((string) ($_POST['image_alt'] ?? $slideLabels[$slideIndex]), 120);

        aims_write_slider_image($slideIndex, $imageUrl, $imageAlt);
        $message = 'Slider image updated successfully.';
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
    }
}

$sliderData = aims_read_slider_images();
$slides = is_array($sliderData['slides'] ?? null) ? $sliderData['slides'] : [];

aims_admin_header('Hero Slider Manager', 'slider');
?>
      <section class="dashboard-hero compact">
        <div>
          <p class="eyebrow">Connected Module</p>
          <h2>Homepage Slider Images</h2>
          <p>Upload replacement images for the three homepage hero slider positions. Text content stays unchanged for safety.</p>
        </div>
        <a class="ghost-link" href="dashboard.php">Back to Dashboard</a>
      </section>

      <?php if ($message !== ''): ?>
        <div class="alert success"><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></div>
      <?php endif; ?>

      <?php if ($error !== ''): ?>
        <div class="alert error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
      <?php endif; ?>

      <section class="grid">
        <form class="panel" method="post" enctype="multipart/form-data">
          <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Upload</p>
              <h2>Replace Slider Image</h2>
            </div>
          </div>

          <label>
            Choose slide
            <select name="slide_index">
              <?php foreach ($slideLabels as $index => $label): ?>
                <option value="<?= $index ?>"><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></option>
              <?php endforeach; ?>
            </select>
          </label>

          <label class="upload-box">
            New slider image
            <input type="file" name="slider_image" accept="image/jpeg,image/png,image/webp" required>
            <small>Recommended wide image. JPG, PNG, or WEBP only. Maximum 2MB.</small>
          </label>

          <label>
            Image alt text
            <input name="image_alt" maxlength="120" value="AIMS Campus homepage slider image">
          </label>

          <div class="save-bar">
            <button type="submit">Save slider image</button>
            <span>Refresh the website after saving.</span>
          </div>
        </form>

        <aside class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Current Admin Images</p>
              <h2>Uploaded Overrides</h2>
            </div>
          </div>
          <div class="admin-image-list">
            <?php foreach ($slideLabels as $index => $label): ?>
              <?php $slide = is_array($slides[(string) $index] ?? null) ? $slides[(string) $index] : null; ?>
              <article>
                <strong><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></strong>
                <?php if ($slide !== null && !empty($slide['imageUrl'])): ?>
                  <img src="<?= htmlspecialchars((string) $slide['imageUrl'], ENT_QUOTES, 'UTF-8') ?>" alt="">
                  <span>Custom image active</span>
                <?php else: ?>
                  <div class="placeholder small">Default website image active</div>
                <?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </aside>
      </section>
<?php
aims_admin_footer();
