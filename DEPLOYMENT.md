# Hostinger deployment

This application has a React/Vite frontend and an Express API in `server.js`.

## Required Hostinger environment variables

`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `ADMIN_PASSWORD` must be configured in the Hostinger dashboard. Do not commit their values.

## Local development

Copy `.env.example` to `.env`, replace the two password placeholders, then run `npm run dev`. This starts the Vite frontend on port 5173 and the Node API on port 3000 together.

## Deployment settings

Configure the Hostinger Node application as **Other** (or **Express**) with:

- Build command: `npm run build`
- Start command: `npm start`
- Entry file: `server.js`
- Output directory: `dist`
- Node.js: 22.x

The application creates the required MySQL tables on startup. Admin pages remain available at `/backend/admin/`, and legacy links such as `/backend/admin/enquiries.php` redirect to the same Node-powered interface.

## Persistent data safety

Contact enquiries, enquiry statuses, admin settings, popup images, slider images, and news gallery uploads are stored in MySQL tables. Redeploying the Node.js application replaces application files only; it does not delete those database records.

Do not move new admin uploads back into `public_html/backend/uploads` or another deploy-managed folder unless that folder is separately backed up and excluded from deployment overwrites.
