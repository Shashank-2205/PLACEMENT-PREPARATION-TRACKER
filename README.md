# Placement Prep Tracker

Dual-login placement preparation platform with role-based access (User/Admin), progress tracking, coding profiles, notes, and analytics.

## Features
- Dual authentication: user vs admin (role-based routes)
- Admin dashboard: user management, settings
- Progress tracking, goals, notes, coding profiles
- DSA/SQL/Python/Java question pages
- Forgot password with temporary password + email support (Nodemailer)

## Tech Stack
- Frontend: React, Vite, React Router
- Backend: Node.js, Express, MySQL
- Auth: Role-based (user/admin), localStorage session

## Quick Start
### 1) Backend
```bash
cd server
npm install
npm start   # uses nodemon index.js
```
Backend runs at http://localhost:5000

### 2) Frontend
```bash
cd client
npm install
npm run dev   # Vite dev server (likely http://localhost:5175)
```

## Database Setup
See `server/setup_db.sql` for schema. Minimum tables: users (includes `role` column), subjects, topics, progress, notes, coding_profiles.

If you already have a DB, ensure `users` has:
```sql
ALTER TABLE users ADD COLUMN role ENUM('user','admin') DEFAULT 'user';
```

## Environment Variables (server/.env)
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=placement_tracker
```
If EMAIL_* are missing, forgot-password still works by returning a temporary password in the response.

## API (Auth)
- POST /api/auth/register
- POST /api/auth/login            (role=user)
- POST /api/auth/admin-login      (role=admin)
- POST /api/auth/forgot-password  (temporary password + optional email)

## Frontend Routes (key)
- /login (User/Admin toggle)
- /register
- /dashboard
- /admin-dashboard (admin only)
- /profile, /coding-profiles, /dsa-questions, /sql-questions, /python-questions, /java-questions, /analytics-dashboard, /goal-tracking, /performance-metrics, /online-compilers

## Test Accounts (insert manually)
```sql
INSERT INTO users (name,email,password,role) VALUES ('Admin User','admin@example.com','admin123','admin');
INSERT INTO users (name,email,password,role) VALUES ('John Doe','john@example.com','password123','user');
```

## Forgot Password Behavior
- Generates a temporary password and updates DB
- If EMAIL_* configured: sends email
- If not configured: returns temp password in response (shown in UI alert / console)

## Scripts
- server: `npm start` (dev with nodemon), `npm run prod`
- client: `npm run dev`

## Notes
- Passwords currently stored plain-text (demo). For production: add bcrypt hashing + JWT sessions.
- Update CORS origin in `server/index.js` if your frontend URL changes.

## File Map (important)
- server/index.js              – Express app entry
- server/routes/authRoutes.js  – Auth + forgot password
- server/config/db.js          – MySQL connection
- server/setup_db.sql          – Schema & seed
- client/src/App.jsx           – Routes
- client/src/components/Login.jsx – Dual login + forgot password modal
- client/src/pages/AdminDashboard.jsx – Admin UI
- client/src/styles/index.css  – Global styles

## Troubleshooting
- Login redirect issues: ensure localStorage has `user` with `role`, and frontend points to correct backend URL.
- Forgot password: if email not received, use the temp password shown in the response; configure EMAIL_* for real emails.
- DB errors: verify MySQL is running and credentials/DB name match `server/config/db.js` or env vars.
