# AIMS Popup Admin Backend

This folder is a separate PHP backend for controlling only the home page popup.

## Setup

1. Host this project on a server with PHP 8.1+.
2. Set an environment variable for admin login:

   ```bash
   AIMS_ADMIN_PASSWORD="use-a-strong-password"
   ```

3. Start PHP locally if testing:

   ```bash
   php -S localhost:8000
   ```

4. Open `/backend/admin/login.php`.
4. Username: `admin`
5. Password: the value of `AIMS_ADMIN_PASSWORD`
6. Update popup status, text, button link, display delay, and popup image.

If `AIMS_ADMIN_PASSWORD` is not set, admin login is disabled for safety.

## Local login URL

```text
http://localhost:8000/backend/admin/login.php
```

## API

The React site reads public popup settings from:

```text
/backend/api/popup.php
```

Uploaded images are stored in:

```text
/backend/uploads/popup/
```
