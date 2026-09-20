<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/../lib/enquiry-store.php';

aims_require_admin();

$enquiries = aims_list_enquiries();

aims_admin_header('Enquiries Database', 'enquiries');
?>
      <section class="dashboard-hero compact">
        <div>
          <p class="eyebrow">Connected Module</p>
          <h2>Contact Form Submissions</h2>
          <p>These enquiries are saved to the protected backend SQLite database.</p>
        </div>
        <a class="ghost-link" href="dashboard.php">Back to Dashboard</a>
      </section>

      <section class="panel wide-panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Latest</p>
            <h2><?= count($enquiries) ?> enquiries</h2>
          </div>
        </div>

        <?php if (count($enquiries) === 0): ?>
          <div class="empty-state">No enquiries saved yet.</div>
        <?php else: ?>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Campus</th>
                  <th>Programme</th>
                  <th>Subject</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($enquiries as $enquiry): ?>
                  <tr>
                    <td><?= htmlspecialchars((string) $enquiry['created_at'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars((string) $enquiry['full_name'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td>
                      <strong><?= htmlspecialchars((string) $enquiry['phone'], ENT_QUOTES, 'UTF-8') ?></strong>
                      <span><?= htmlspecialchars((string) $enquiry['email'], ENT_QUOTES, 'UTF-8') ?></span>
                    </td>
                    <td><?= htmlspecialchars((string) $enquiry['campus'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars((string) $enquiry['programme'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars((string) $enquiry['subject'], ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars((string) $enquiry['message'], ENT_QUOTES, 'UTF-8') ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
      </section>
<?php
aims_admin_footer();
