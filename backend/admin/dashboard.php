<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

aims_require_admin();

aims_admin_header('Admin Dashboard', 'dashboard');
?>
      <section class="module-grid">
        <article class="module-card ready">
          <div class="module-icon">📢</div>
          <div>
            <p class="eyebrow">Connected</p>
            <h3>Popup Manager</h3>
            <p>Change popup text, button link, image, timing, and visibility.</p>
            <a href="index.php">Open module</a>
          </div>
        </article>

        <article class="module-card ready">
          <div class="module-icon">📝</div>
          <div>
            <p class="eyebrow">Connected</p>
            <h3>Hero Slider</h3>
            <p>Change the three homepage slider images safely from admin uploads.</p>
            <a href="slider.php">Open module</a>
          </div>
        </article>

        <article class="module-card ready">
          <div class="module-icon">🖼️</div>
          <div>
            <p class="eyebrow">Connected</p>
            <h3>News Images</h3>
            <p>Add new albums and images to News & Updates galleries.</p>
            <a href="news.php">Open module</a>
          </div>
        </article>

        <article class="module-card ready">
          <div class="module-icon">📩</div>
          <div>
            <p class="eyebrow">Connected</p>
            <h3>Enquiries Database</h3>
            <p>View contact form submissions saved securely in the backend database.</p>
            <a href="enquiries.php">Open module</a>
          </div>
        </article>
      </section>
<?php
aims_admin_footer();