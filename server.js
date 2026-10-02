import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';

const directory = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const app = express();
app.disable('x-powered-by');
app.use((request, response, next) => {
  const origin = request.get('origin');
  const allowedOrigins = new Set(['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174']);

  if (origin && allowedOrigins.has(origin)) {
    response.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    });
  }

  if (request.method === 'OPTIONS') return response.sendStatus(204);
  return next();
});
app.use(express.json({ limit: '256kb' }));
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
});

const databaseConfig = {
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT ?? '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  enableKeepAlive: true,
  charset: 'utf8mb4',
};

const missingDatabaseVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
  .filter((key) => !process.env[key]);
const pool = missingDatabaseVariables.length === 0 ? mysql.createPool(databaseConfig) : null;
let schemaPromise;

const defaultPopup = {
  enabled: true,
  delayMs: 600,
  frequency: 'session',
  eyebrow: 'Admissions',
  title: 'New intake now open!',
  message: 'Limited seats available for this intake. Apply now to secure your place.',
  primaryLabel: 'Apply now',
  primaryUrl: '/contact',
  secondaryLabel: 'Maybe later',
  imageUrl: '',
  imageAlt: 'New intake now open at AIMS Campus',
};

function apiError(response, status, message) {
  response.status(status).json({ ok: false, message });
}

async function ensureSchema() {
  if (!pool) {
    throw new Error(`Missing database environment variables: ${missingDatabaseVariables.join(', ')}`);
  }

  if (!schemaPromise) {
    schemaPromise = (async () => {
      await pool.query(`CREATE TABLE IF NOT EXISTS enquiries (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(120) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        email VARCHAR(160) NOT NULL,
        campus VARCHAR(40) NOT NULL,
        programme VARCHAR(40) NOT NULL,
        subject VARCHAR(140) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
        admin_note TEXT NOT NULL,
        ip_address VARCHAR(80) NULL,
        user_agent VARCHAR(240) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX enquiries_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await pool.query(`CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(80) NOT NULL,
        setting_value JSON NOT NULL,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await pool.query(`CREATE TABLE IF NOT EXISTS media_assets (
        id CHAR(32) NOT NULL,
        file_name VARCHAR(180) NOT NULL,
        mime_type VARCHAR(80) NOT NULL,
        content MEDIUMBLOB NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    })();
  }

  return schemaPromise;
}

async function readSetting(key, fallback) {
  await ensureSchema();
  const [rows] = await pool.execute('SELECT setting_value FROM site_settings WHERE setting_key = ?', [key]);
  if (rows.length === 0) return fallback;

  const value = rows[0].setting_value;
  if (typeof value === 'object' && value !== null) return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function cleanText(value, maxLength) {
  return String(value ?? '').replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendPopup(_request, response) {
  try {
    const popup = await readSetting('popup', defaultPopup);
    response.set('Cache-Control', 'no-store, max-age=0').json({ ...defaultPopup, ...popup });
  } catch (error) {
    console.error('Could not read popup settings', error);
    apiError(response, 503, 'The website service is temporarily unavailable.');
  }
}

async function sendSlider(_request, response) {
  try {
    response.set('Cache-Control', 'no-store, max-age=0').json(await readSetting('slider', { slides: [] }));
  } catch (error) {
    console.error('Could not read slider settings', error);
    apiError(response, 503, 'The website service is temporarily unavailable.');
  }
}

async function sendNewsImages(_request, response) {
  try {
    response.set('Cache-Control', 'no-store, max-age=0').json(await readSetting('news-images', { albums: {}, customAlbums: {} }));
  } catch (error) {
    console.error('Could not read news images', error);
    apiError(response, 503, 'The website service is temporarily unavailable.');
  }
}

async function createEnquiry(request, response) {
  const input = request.body ?? {};
  const fullName = cleanText(input.fullName, 120);
  const phone = cleanText(input.phone, 40);
  const email = cleanText(input.email, 160);
  const campus = cleanText(input.campus, 40);
  const programme = cleanText(input.programme, 40);
  const subject = cleanText(input.subject, 140);
  const message = cleanText(input.message, 1200);
  const campuses = new Set(['colombo-07', 'negombo', 'not-sure']);
  const programmes = new Set(['foundation', 'diploma', 'bachelors', 'masters', 'professional', 'english', 'not-sure']);

  if (!fullName || !phone || !email || !subject || !message) {
    return apiError(response, 422, 'Please complete all required fields.');
  }
  if (!isEmail(email)) return apiError(response, 422, 'Please enter a valid email address.');
  if (!campuses.has(campus) || !programmes.has(programme)) return apiError(response, 422, 'Invalid form selection.');

  try {
    await ensureSchema();
    const [result] = await pool.execute(
      `INSERT INTO enquiries (full_name, phone, email, campus, programme, subject, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, phone, email, campus, programme, subject, message,
        cleanText(request.ip, 80), cleanText(request.get('user-agent'), 240)],
    );
    response.status(201).json({ ok: true, id: result.insertId, message: 'Enquiry saved successfully.' });
  } catch (error) {
    console.error('Could not save enquiry', error);
    apiError(response, 503, 'We could not submit your enquiry right now. Please try again later.');
  }
}

async function writeSetting(key, value) {
  await ensureSchema();
  await pool.execute(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, JSON.stringify(value)],
  );
}

function cookieValue(request, name) {
  const cookies = String(request.headers.cookie ?? '').split(';');
  const prefix = `${name}=`;
  const value = cookies.map((part) => part.trim()).find((part) => part.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : '';
}

function adminSessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) return '';
  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 8;
  const signature = crypto.createHmac('sha256', password).update(`aims-admin:${expires}`).digest('base64url');
  return `${expires}.${signature}`;
}

function hasAdminSession(request) {
  const password = process.env.ADMIN_PASSWORD;
  const token = cookieValue(request, 'aims_admin');
  const [expires, signature] = token.split('.');
  if (!password || !expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = crypto.createHmac('sha256', password).update(`aims-admin:${expires}`).digest('base64url');
  return signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function requireAdmin(request, response, next) {
  if (!hasAdminSession(request)) return apiError(response, 401, 'Admin login required.');
  return next();
}

function requireSameOrigin(request, response, next) {
  const origin = request.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.get('host')) return apiError(response, 403, 'Invalid request origin.');
    } catch {
      return apiError(response, 403, 'Invalid request origin.');
    }
  }
  return next();
}

function safeImage(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
    throw new Error('Choose a JPG, PNG, or WEBP image.');
  }
  return file;
}

async function saveImage(file, prefix) {
  const image = safeImage(file);
  await ensureSchema();
  const id = crypto.randomBytes(16).toString('hex');
  const extension = image.mimetype === 'image/jpeg' ? 'jpg' : image.mimetype.split('/')[1];
  const fileName = `${prefix}-${new Date().toISOString().replace(/[:.]/g, '-')}.${extension}`;
  await pool.execute(
    'INSERT INTO media_assets (id, file_name, mime_type, content) VALUES (?, ?, ?, ?)',
    [id, fileName, image.mimetype, image.buffer],
  );
  return { id, url: `/backend/media/${id}`, fileName };
}

function cleanPopup(input) {
  const url = cleanText(input.primaryUrl, 300);
  return {
    enabled: Boolean(input.enabled),
    delayMs: Math.max(0, Math.min(10000, Number.parseInt(input.delayMs, 10) || 0)),
    frequency: input.frequency === 'always' ? 'always' : 'session',
    eyebrow: cleanText(input.eyebrow, 40),
    title: cleanText(input.title, 90),
    message: cleanText(input.message, 220),
    primaryLabel: cleanText(input.primaryLabel, 40),
    primaryUrl: url.startsWith('/') || /^https?:\/\//i.test(url) ? url : '/contact',
    secondaryLabel: cleanText(input.secondaryLabel, 40),
    imageUrl: cleanText(input.imageUrl, 300),
    imageAlt: cleanText(input.imageAlt, 120),
  };
}

app.get(['/api/health', '/backend/api/health'], async (_request, response) => {
  try {
    await ensureSchema();
    await pool.query('SELECT 1');
    response.json({ ok: true });
  } catch (error) {
    console.error('Health check failed', error);
    apiError(response, 503, 'Database connection unavailable.');
  }
});

app.get(['/api/popup', '/backend/api/popup.php'], sendPopup);
app.get(['/api/slider', '/backend/api/slider.php'], sendSlider);
app.get(['/api/news-images', '/backend/api/news-images.php'], sendNewsImages);
app.post(['/api/enquiries', '/backend/api/enquiry.php'], createEnquiry);

app.get('/backend/media/:id', async (request, response) => {
  try {
    await ensureSchema();
    const [rows] = await pool.execute('SELECT file_name, mime_type, content FROM media_assets WHERE id = ?', [request.params.id]);
    if (rows.length === 0) return response.sendStatus(404);
    response.set({
      'Content-Type': rows[0].mime_type,
      'Content-Disposition': `inline; filename="${rows[0].file_name.replaceAll('"', '')}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    }).send(rows[0].content);
  } catch (error) {
    console.error('Could not read media asset', error);
    response.sendStatus(503);
  }
});

app.get('/backend/admin/api/session', (request, response) => response.json({ ok: true, authenticated: hasAdminSession(request) }));
app.post('/backend/admin/api/login', requireSameOrigin, (request, response) => {
  const supplied = String(request.body?.password ?? '');
  const password = process.env.ADMIN_PASSWORD ?? '';
  if (password.length < 12 || supplied.length !== password.length || !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(password))) {
    return apiError(response, 401, 'Invalid username or password.');
  }
  response.cookie('aims_admin', adminSessionToken(), { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 8 * 60 * 60 * 1000, path: '/backend/admin' });
  return response.json({ ok: true });
});
app.post('/backend/admin/api/logout', requireSameOrigin, (_request, response) => {
  response.clearCookie('aims_admin', { httpOnly: true, sameSite: 'strict', secure: true, path: '/backend/admin' });
  response.json({ ok: true });
});

app.get('/backend/admin/api/enquiries', requireAdmin, async (_request, response) => {
  try {
    await ensureSchema();
    const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 200');
    response.json({ ok: true, enquiries: rows });
  } catch (error) {
    console.error('Could not list enquiries', error);
    apiError(response, 503, 'Could not load enquiries.');
  }
});
app.patch('/backend/admin/api/enquiries/:id', requireAdmin, requireSameOrigin, async (request, response) => {
  const status = String(request.body?.status ?? '');
  if (!['new', 'contacted', 'closed'].includes(status)) return apiError(response, 422, 'Invalid enquiry status.');
  try {
    await ensureSchema();
    await pool.execute('UPDATE enquiries SET status = ?, admin_note = ? WHERE id = ?', [status, cleanText(request.body?.adminNote, 1200), request.params.id]);
    response.json({ ok: true });
  } catch (error) {
    console.error('Could not update enquiry', error);
    apiError(response, 503, 'Could not update enquiry.');
  }
});
app.delete('/backend/admin/api/enquiries/:id', requireAdmin, requireSameOrigin, async (request, response) => {
  try {
    await ensureSchema();
    await pool.execute('DELETE FROM enquiries WHERE id = ?', [request.params.id]);
    response.json({ ok: true });
  } catch (error) {
    console.error('Could not delete enquiry', error);
    apiError(response, 503, 'Could not delete enquiry.');
  }
});

app.get('/backend/admin/api/popup', requireAdmin, sendPopup);
app.put('/backend/admin/api/popup', requireAdmin, requireSameOrigin, async (request, response) => {
  try {
    await writeSetting('popup', cleanPopup(request.body ?? {}));
    response.json({ ok: true });
  } catch (error) {
    console.error('Could not save popup settings', error);
    apiError(response, 503, 'Could not save popup settings.');
  }
});
app.post('/backend/admin/api/popup/image', requireAdmin, requireSameOrigin, upload.single('image'), async (request, response) => {
  try {
    const image = await saveImage(request.file, 'popup');
    const popup = await readSetting('popup', defaultPopup);
    await writeSetting('popup', { ...defaultPopup, ...popup, imageUrl: image.url, imageAlt: cleanText(request.body?.imageAlt, 120) });
    response.json({ ok: true, imageUrl: image.url });
  } catch (error) {
    apiError(response, 422, error.message || 'Could not upload image.');
  }
});

app.post('/backend/admin/api/slider', requireAdmin, requireSameOrigin, upload.single('image'), async (request, response) => {
  const index = Number.parseInt(request.body?.index, 10);
  if (![0, 1, 2].includes(index)) return apiError(response, 422, 'Invalid slider position.');
  try {
    const image = await saveImage(request.file, `hero-slide-${index + 1}`);
    const data = await readSetting('slider', { slides: [] });
    const slides = { ...(data.slides ?? {}) };
    slides[String(index)] = { imageUrl: image.url, imageAlt: cleanText(request.body?.imageAlt, 120), updatedAt: new Date().toISOString() };
    await writeSetting('slider', { slides });
    response.json({ ok: true, slide: slides[String(index)] });
  } catch (error) {
    apiError(response, 422, error.message || 'Could not upload image.');
  }
});

app.post('/backend/admin/api/news/albums', requireAdmin, requireSameOrigin, async (request, response) => {
  const title = cleanText(request.body?.title, 90);
  if (!title) return apiError(response, 422, 'Album title is required.');
  try {
    const data = await readSetting('news-images', { albums: {}, customAlbums: {} });
    const base = `admin-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'album'}`;
    let id = base; let counter = 2;
    while (data.customAlbums?.[id]) id = `${base}-${counter++}`;
    const customAlbums = { ...(data.customAlbums ?? {}), [id]: { id, title, category: cleanText(request.body?.category, 40) || 'Campus Update', summary: cleanText(request.body?.summary, 220), dateLabel: 'Latest update', location: 'AIMS Campus', tag: cleanText(request.body?.category, 40) || 'Campus Update', folder: 'Admin Uploads', createdAt: new Date().toISOString() } };
    await writeSetting('news-images', { albums: data.albums ?? {}, customAlbums });
    response.status(201).json({ ok: true, id });
  } catch (error) {
    console.error('Could not create news album', error);
    apiError(response, 503, 'Could not create album.');
  }
});
app.post('/backend/admin/api/news/images', requireAdmin, requireSameOrigin, upload.single('image'), async (request, response) => {
  const albumId = cleanText(request.body?.albumId, 70);
  if (!albumId) return apiError(response, 422, 'Choose an album.');
  try {
    const image = await saveImage(request.file, `news-${albumId}`);
    const data = await readSetting('news-images', { albums: {}, customAlbums: {} });
    const albums = { ...(data.albums ?? {}) };
    albums[albumId] = [...(albums[albumId] ?? []), { src: image.url, alt: cleanText(request.body?.alt, 140), fileName: image.fileName, uploadedAt: new Date().toISOString() }];
    await writeSetting('news-images', { albums, customAlbums: data.customAlbums ?? {} });
    response.status(201).json({ ok: true });
  } catch (error) {
    apiError(response, 422, error.message || 'Could not upload image.');
  }
});

app.get(['/backend/admin', '/backend/admin/', '/backend/admin/login.php', '/backend/admin/index.php', '/backend/admin/dashboard.php', '/backend/admin/enquiries.php', '/backend/admin/slider.php', '/backend/admin/news.php'], (_request, response) => {
  response.sendFile(path.join(directory, 'admin.html'));
});

app.use(express.static(path.join(directory, 'dist'), { index: false, maxAge: '1h' }));
app.use((_request, response) => response.sendFile(path.join(directory, 'dist', 'index.html')));

app.listen(port, () => {
  const databaseStatus = pool ? `${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}` : 'not configured';
  console.log(`AIMS Campus server listening on port ${port}; database: ${databaseStatus}`);
});
