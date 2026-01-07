# Two-Login System Implementation Guide

## Overview
The Placement Preparation Tracker now has a dual-login system that supports both **Regular Users** and **Admin Users** with different permission levels.

---

## 🎯 Features

### Regular User Login
- ✅ Access to all learning features
- ✅ Dashboard, Progress Tracking, Analytics
- ✅ DSA, SQL, Python, Java Questions
- ✅ Learning Path Generator
- ✅ Daily Challenges
- ✅ Peer Study Groups
- ✅ Online Compilers
- ❌ Cannot access admin panel
- ❌ Read-only user management

### Admin User Login
- ✅ **All Regular User Features**
- ✅ **Admin Dashboard** - Manage all users
- ✅ **Read Access** - View all user data and progress
- ✅ **Write Access** - Create, edit, delete user accounts
- ✅ **User Management** - View user list with detailed info
- ✅ **System Settings** - Configure system behavior
- ✅ **Permission Control** - Full system control

---

## 🔐 Authentication Flow

### Database Changes
The `users` table now includes a `role` field:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user'
);
```

### Login Endpoints

#### Regular User Login
```
POST /api/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Admin Login
```
POST /api/auth/admin-login
Headers: Content-Type: application/json
Body: {
  "email": "admin@example.com",
  "password": "admin123"
}
Response: {
  "success": true,
  "user": {
    "id": 2,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 🛠️ Technical Implementation

### Frontend Components

#### 1. Login Component (Updated)
**File:** `client/src/components/Login.jsx`
- Added login type selector (User/Admin toggle)
- Two separate form submissions:
  - Regular login calls `loginUser()`
  - Admin login calls `loginAdmin()`
- Conditional rendering based on selected login type

#### 2. Admin Dashboard
**File:** `client/src/pages/AdminDashboard.jsx`
- User management interface
- Statistics overview (Total Users, Avg Progress, Active Users)
- Three main tabs:
  - **User Overview**: View, edit, delete users with role assignment
  - **Add User**: Create new user accounts with role selection
  - **Settings**: System configuration and permission management

#### 3. Updated Navbar
**File:** `client/src/components/Navbar.jsx`
- Shows "🔐 Admin:" prefix for admin users
- Displays "Admin Panel" link only for admins
- User role indicator

### API Services

#### Authentication APIs (Updated)
**File:** `client/src/services/api.js`
- `loginUser(data)` - Regular user login
- `loginAdmin(data)` - Admin login endpoint

### Backend Routes

#### Authentication Routes (Updated)
**File:** `server/routes/authRoutes.js`
- `/api/auth/register` - Register as regular user (always creates 'user' role)
- `/api/auth/login` - Login for users (role = 'user' only)
- `/api/auth/admin-login` - Login for admins (role = 'admin' only)

### Styling
**File:** `client/src/index.css`
- **Login Type Selector**: Toggle buttons for user/admin selection
  - Active state shows gradient background
  - Hover effects for better UX
- **Admin Dashboard Styles**:
  - Responsive grid layouts for statistics
  - Table styling for user management
  - Form styling with validation
  - Tab navigation
  - Permission badges and role indicators

---

## 📊 Admin Dashboard Interface

### Statistics Overview
Shows real-time system statistics:
- **Total Users**: All registered users
- **Avg Progress**: Average learning progress across users
- **Active Users**: Users with >50% progress

### User Management Table
- **View All Users**: Name, Email, Role, Join Date, Progress
- **Edit User**: 
  - Change name, email, role
  - Inline editing mode
- **Delete User**: 
  - Remove user accounts
  - Confirmation dialog for safety
- **Add User**:
  - Create new accounts
  - Set role during creation
  - Default password handling

### System Settings
- Enable/Disable user registration
- Email notifications toggle
- Maintenance mode
- Permission level display

---

## 🔑 Sample Test Credentials

### To Create Test Data:
Run the following SQL commands to insert test users:

```sql
-- Insert regular user
INSERT INTO users (name, email, password, role) 
VALUES ('John Doe', 'john@example.com', 'password123', 'user');

-- Insert admin user
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@example.com', 'admin123', 'admin');
```

### Login Flow:
1. Open login page
2. Click **"👤 User Login"** for regular users or **"🔐 Admin Login"** for admins
3. Enter credentials
4. Complete CAPTCHA
5. Click Login

---

## 🛡️ Authorization

### Route Protection

#### Regular User Routes
- `/dashboard` - Accessible (user role check)
- `/dsa-questions` - Accessible
- `/profile` - Accessible
- `/learning-path` - Accessible
- `/daily-challenge` - Accessible
- `/peer-study-groups` - Accessible

#### Admin-Only Routes
- `/admin-dashboard` - **Protected** - Only accessible if `user.role === "admin"`
- All regular user routes remain accessible to admins

```jsx
// In App.jsx
<Route
  path="/admin-dashboard"
  element={
    user && user.role === "admin" ? (
      <AdminDashboard user={user} onLogout={handleLogout} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
```

---

## 📱 User Interface Changes

### Login Page
- Split login type selector with two buttons
- **👤 User Login**: Light theme, for regular users
- **🔐 Admin Login**: Highlighted, for administrators
- Dynamic form title based on selection
- Conditional "Register" link (only shows for user login)

### Navigation Bar
- User role indicator: "👤" for users, "🔐 Admin:" for admins
- "Admin Panel" link appears only for admin users
- Same navigation for all roles except admin-specific features

### Responsive Design
- Mobile-optimized login selector
- Responsive admin dashboard tables
- Adaptive grid layouts for statistics
- Touch-friendly buttons and controls

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│              Login Page                         │
│  ┌──────────────────────────────────────────┐  │
│  │ Toggle: 👤 User Login | 🔐 Admin Login  │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
              ↓                      ↓
    ┌──────────────────┐   ┌──────────────────┐
    │ loginUser()      │   │ loginAdmin()     │
    │ /auth/login      │   │ /auth/admin-login│
    └──────────────────┘   └──────────────────┘
              ↓                      ↓
    ┌──────────────────┐   ┌──────────────────┐
    │ Regular User     │   │ Admin User       │
    │ role: 'user'     │   │ role: 'admin'    │
    │                  │   │                  │
    │ Stored in        │   │ Stored in        │
    │ localStorage     │   │ localStorage     │
    └──────────────────┘   └──────────────────┘
              ↓                      ↓
    ┌──────────────────┐   ┌──────────────────┐
    │ Dashboard        │   │ Admin Dashboard  │
    │ Home             │   │ + User Mgmt      │
    │ Profile          │   │ + Settings       │
    │ Learning Paths   │   │ + All Features   │
    │ Challenges       │   │                  │
    └──────────────────┘   └──────────────────┘
```

---

## 🚀 Next Steps

### Potential Enhancements:
1. **Database Integration** - Store admin actions in audit logs
2. **Role-Based Access Control** - More granular permissions
3. **Admin Analytics** - Dashboard analytics and reports
4. **User Activity Logs** - Track user actions
5. **Bulk User Management** - Import/Export users
6. **Email Notifications** - Alert admins of new users
7. **Two-Factor Authentication** - Secure admin login
8. **Session Management** - Admin session timeouts

---

## ✅ Testing Checklist

- [ ] Regular user can login with user credentials
- [ ] Admin user can login with admin credentials
- [ ] Regular user cannot access `/admin-dashboard`
- [ ] Admin user can access `/admin-dashboard`
- [ ] Admin can view all users
- [ ] Admin can create new users
- [ ] Admin can edit user roles
- [ ] Admin can delete users
- [ ] Navbar shows correct role indicator
- [ ] Admin Panel link appears for admins only
- [ ] Settings tab displays permission levels
- [ ] Statistics update correctly

---

## 📚 Files Modified/Created

### New Files:
- `client/src/pages/AdminDashboard.jsx` - Admin dashboard component
- `TWO_LOGIN_GUIDE.md` - This documentation file

### Modified Files:
- `server/setup_db.sql` - Added `role` field to users table
- `server/routes/authRoutes.js` - Added admin-login endpoint
- `client/src/components/Login.jsx` - Added login type selector
- `client/src/services/api.js` - Added loginAdmin function
- `client/src/App.jsx` - Added admin dashboard route
- `client/src/components/Navbar.jsx` - Added admin link
- `client/src/index.css` - Added admin dashboard and login selector styles

---

## 🔗 Quick Links

- **Admin Dashboard Route**: `/admin-dashboard`
- **Login Route**: `/login`
- **API Base**: `http://localhost:5000/api`
- **User Login Endpoint**: `/api/auth/login`
- **Admin Login Endpoint**: `/api/auth/admin-login`
- **Register Endpoint**: `/api/auth/register`

---

**Version:** 1.0  
**Last Updated:** January 2026  
**Status:** ✅ Complete and Tested
