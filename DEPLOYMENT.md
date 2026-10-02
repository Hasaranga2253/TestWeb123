# Hostinger deployment

This application has a React/Vite frontend and an Express API in `server.js`.

## Required Hostinger environment variables

`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `ADMIN_PASSWORD` must be configured in the Hostinger dashboard. Do not commit their values.

## Deployment settings

Configure the Hostinger Node application as **Other** (or **Express**) with:

- Build command: `npm run build`
- Start command: `npm start`
- Entry file: `server.js`
- Output directory: `dist`
- Node.js: 22.x

The application creates the required MySQL tables on startup. Admin pages remain available at `/backend/admin/`, and legacy links such as `/backend/admin/enquiries.php` redirect to the same Node-powered interface.
