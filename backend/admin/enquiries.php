<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';
require_once __DIR__ . '/../lib/enquiry-store.php';

aims_require_admin();

$result = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    aims_verify_csrf();

    $action = $_POST['action'] ?? '';
    $id = filter_input(INPUT_POST, 'enquiry_id', FILTER_VALIDATE_INT);

    try {
        if (!is_int($id) || $id < 1) {
            throw new RuntimeException('That enquiry could not be found.');
        }

        if ($action === 'update') {
            $status = $_POST['status'] ?? '';
            $adminNote = $_POST['admin_note'] ?? '';

            if (!is_string($status) || !is_string($adminNote)) {
                throw new RuntimeException('Invalid enquiry update.');
            }

            $result = aims_update_enquiry($id, $status, $adminNote)
                ? 'Enquiry updated successfully.'
                : 'No enquiry changes were saved.';
        } elseif ($action === 'delete') {
            $result = aims_delete_enquiry($id)
                ? 'Enquiry deleted permanently.'
                : 'That enquiry was already removed.';
        } else {
            throw new RuntimeException('Invalid enquiry action.');
        }
    } catch (RuntimeException $exception) {
        $result = $exception->getMessage();
    }
}

$enquiries = aims_list_enquiries();
$statuses = aims_enquiry_statuses();

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

        <?php if ($result !== ''): ?>
          <div class="alert <?= str_contains($result, 'successfully') || str_contains($result, 'deleted') ? 'success' : 'error' ?>">
            <?= htmlspecialchars($result, ENT_QUOTES, 'UTF-8') ?>
          </div>
        <?php endif; ?>

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
                  <th>Follow-up</th>
                  <th>Actions</th>
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
                    <td>
                      <form method="post">
                        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="enquiry_id" value="<?= (int) $enquiry['id'] ?>">
                        <label>
                          Status
                          <select name="status">
                            <?php foreach ($statuses as $value => $label): ?>
                              <option value="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>" <?= ($enquiry['status'] ?? 'new') === $value ? 'selected' : '' ?>>
                                <?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
                              </option>
                            <?php endforeach; ?>
                          </select>
                        </label>
                        <label>
                          Private note
                          <textarea name="admin_note" maxlength="1200" placeholder="Add a follow-up note..."><?= htmlspecialchars((string) ($enquiry['admin_note'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>
                        </label>
                        <button type="submit">Save</button>
                      </form>
                    </td>
                    <td>
                      <form method="post" onsubmit="return confirm('Permanently delete this enquiry? This cannot be undone.');">
                        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(aims_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="enquiry_id" value="<?= (int) $enquiry['id'] ?>">
                        <button type="submit">Delete</button>
                      </form>
                    </td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
      </section>
<?php
aims_admin_footer();
