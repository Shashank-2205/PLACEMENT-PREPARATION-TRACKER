# Setting Up Test Admin & User Accounts

## Quick Setup Instructions

### Step 1: Update Database Schema
Run this SQL command to add the role field (if you haven't already):

```sql
-- Update the users table to add role field
ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user';
```

### Step 2: Create Test Accounts
Run these SQL commands to create test user and admin accounts:

```sql
-- Regular User Account
INSERT INTO users (name, email, password, role) 
VALUES ('John Doe', 'john@example.com', 'password123', 'user');

-- Admin User Account
INSERT INTO users (name, email, password, role) 
VALUES ('System Admin', 'admin@example.com', 'admin123', 'admin');

-- Additional Regular Users (for testing admin features)
INSERT INTO users (name, email, password, role) 
VALUES ('Jane Smith', 'jane@example.com', 'password123', 'user');

INSERT INTO users (name, email, password, role) 
VALUES ('Priya Kumar', 'priya@example.com', 'password123', 'user');

INSERT INTO users (name, email, password, role) 
VALUES ('Arjun Singh', 'arjun@example.com', 'password123', 'user');
```

### Step 3: Verify Installation
Check that users were created:

```sql
SELECT id, name, email, role FROM users;
```

Expected output:
```
| id | name          | email                | role  |
|----|---------------|----------------------|-------|
| 1  | John Doe      | john@example.com     | user  |
| 2  | System Admin  | admin@example.com    | admin |
| 3  | Jane Smith    | jane@example.com     | user  |
| 4  | Priya Kumar   | priya@example.com    | user  |
| 5  | Arjun Singh   | arjun@example.com    | user  |
```

---

## 🧪 Testing the Two-Login System

### Test Case 1: Regular User Login
1. Go to `http://localhost:5175/login`
2. Click **"👤 User Login"** button
3. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
4. Complete CAPTCHA
5. Click **Login**
6. Expected: Redirected to Dashboard
7. Expected: Navbar shows "👤 John Doe"
8. Expected: No "Admin Panel" link in navbar

### Test Case 2: Admin User Login
1. Go to `http://localhost:5175/login`
2. Click **"🔐 Admin Login"** button
3. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Complete CAPTCHA
5. Click **Admin Login**
6. Expected: Redirected to Dashboard
7. Expected: Navbar shows "🔐 Admin: System Admin"
8. Expected: "Admin Panel" link visible in navbar

### Test Case 3: Access Admin Dashboard
1. Login as admin (see Test Case 2)
2. Click **"Admin Panel"** in navbar
3. Expected: Admin Dashboard loads
4. Expected: Shows statistics (Total Users, Avg Progress, Active Users)
5. Expected: User management table with all users

### Test Case 4: User Cannot Access Admin Panel
1. Login as regular user (see Test Case 1)
2. Try to access `http://localhost:5175/admin-dashboard` directly
3. Expected: Redirected to `/login` page
4. Expected: No access to admin features

### Test Case 5: Manage Users (Admin Only)
1. Login as admin
2. Go to Admin Panel
3. Click **"📋 User Overview"** tab
4. Actions available:
   - **Edit User**: Click Edit, modify name/email/role, save
   - **Delete User**: Click Delete, confirm removal
5. Click **"➕ Add User"** tab
6. Fill in:
   - User Name: `Test User`
   - Email: `test@example.com`
   - Role: `user` or `admin`
7. Click **"Add User"**
8. Expected: New user appears in User Overview

### Test Case 6: System Settings (Admin Only)
1. Login as admin
2. Go to Admin Panel
3. Click **"⚙️ Settings"** tab
4. View available settings:
   - Enable User Registration ✓
   - Enable Email Notifications ✓
   - Maintenance Mode
5. View Permission Info:
   - ✅ Read Access: View all user data and progress
   - ✏️ Write Access: Edit, delete, and create user accounts
   - 🔧 Admin Access: Full system control and configuration

---

## 📱 Login UI Comparison

### Before (Single Login)
```
┌─────────────────────┐
│   Welcome back      │
│                     │
│   [ Login Button ]  │
│                     │
└─────────────────────┘
```

### After (Dual Login)
```
┌──────────────────────────────────┐
│      Welcome back                │
│                                  │
│  [👤 User] [🔐 Admin]           │
│                                  │
│  Title: User Login               │
│  [ Login Button ]                │
│                                  │
└──────────────────────────────────┘
```

---

## 🔄 User Flow Diagram

### Regular User Path
```
Login Page
    ↓
[👤 User Login] ← Select User
    ↓
Email: john@example.com
Password: password123
    ↓
loginUser() API call
    ↓
/api/auth/login endpoint
    ↓
Validate: email + password + role = 'user'
    ↓
User Dashboard
├── Home
├── Learning Paths
├── Daily Challenges
├── Peer Study Groups
└── Profile (Read-only)
```

### Admin User Path
```
Login Page
    ↓
[🔐 Admin Login] ← Select Admin
    ↓
Email: admin@example.com
Password: admin123
    ↓
loginAdmin() API call
    ↓
/api/auth/admin-login endpoint
    ↓
Validate: email + password + role = 'admin'
    ↓
Admin Dashboard
├── User Overview
│   ├── View All Users
│   ├── Edit Users
│   └── Delete Users
├── Add Users
│   ├── Create new accounts
│   └── Assign roles
├── Settings
│   ├── System Configuration
│   └── Permissions
└── All User Features Available
```

---

## 🛡️ Security Considerations

### Password Handling
⚠️ **Note:** Current implementation stores passwords in plain text for demo purposes.
For production:
1. Use bcrypt or similar for password hashing
2. Implement password reset functionality
3. Add password strength requirements

### Role Validation
- Backend validates role on every login request
- Frontend checks role before showing admin features
- Route protection prevents unauthorized access

### Session Management
- User data stored in localStorage (includes role)
- Role check on protected routes
- Logout clears all user data

---

## 📊 SQL Commands Reference

### Check All Users with Roles
```sql
SELECT id, name, email, role FROM users;
```

### Check Only Admin Users
```sql
SELECT id, name, email FROM users WHERE role = 'admin';
```

### Check Only Regular Users
```sql
SELECT id, name, email FROM users WHERE role = 'user';
```

### Update User Role
```sql
UPDATE users SET role = 'admin' WHERE email = 'john@example.com';
```

### Delete User
```sql
DELETE FROM users WHERE email = 'john@example.com';
```

### Count Users by Role
```sql
SELECT role, COUNT(*) as count FROM users GROUP BY role;
```

---

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm install
node index.js
```
Server runs on: `http://localhost:5000`

### Start Frontend Development
```bash
cd client
npm install
npm run dev
```
Frontend runs on: `http://localhost:5175`

### Database Connection
Ensure MySQL is running and database is created:
```bash
mysql -u root -p
CREATE DATABASE placement_tracker;
```

---

## ❌ Common Issues & Solutions

### Issue 1: "Invalid admin credentials"
**Solution:** 
- Verify email and password are correct
- Check user role is 'admin' in database:
  ```sql
  SELECT * FROM users WHERE email = 'admin@example.com';
  ```
- Ensure role column exists in users table

### Issue 2: Admin can't see users
**Solution:**
- Verify user is logged in as admin (check navbar)
- Clear browser cache/localStorage
- Restart application

### Issue 3: Regular user can access admin panel
**Solution:**
- Check App.jsx route protection
- Verify role check: `user && user.role === "admin"`
- Clear localStorage and re-login

### Issue 4: CAPTCHA blocking login
**Solution:**
- Mark CAPTCHA as valid in Login component
- Check Captcha.jsx validation logic
- Test with CAPTCHA disabled (dev only)

---

## 📝 Notes

- All test passwords are for demo purposes only
- Change passwords before production deployment
- Add encryption for password storage
- Implement audit logging for admin actions
- Consider adding 2FA for admin accounts

---

## ✅ Checklist Before Going Live

- [ ] Database schema includes role field
- [ ] Test users created with different roles
- [ ] Regular user login works
- [ ] Admin user login works
- [ ] Admin dashboard loads for admins only
- [ ] User management features work
- [ ] Settings page functional
- [ ] Role-based navbar updates work
- [ ] No regular users can access `/admin-dashboard`
- [ ] Logout clears all session data
- [ ] Passwords stored securely (hashed)
- [ ] CAPTCHA validation working

---

**Last Updated:** January 2026
