# Email Configuration Guide for Forgot Password

## Setup Instructions

### Step 1: Install Nodemailer
Run this command in the server directory:
```bash
npm install nodemailer
```

### Step 2: Configure Gmail (Recommended)

**Option A: Using Gmail App Password (Recommended)**

1. Go to [Google Account](https://myaccount.google.com/)
2. Click "Security" in the left menu
3. Scroll down to "App passwords" (requires 2FA enabled)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password

**Option B: Using Gmail Account Password**
- Simply use your Gmail password

### Step 3: Update authRoutes.js

Open `server/routes/authRoutes.js` and replace:
```javascript
user: "your-email@gmail.com",      // Replace with your Gmail
pass: "your-app-password"          // Replace with App Password or Gmail password
```

With your actual Gmail credentials:
```javascript
user: "your.email@gmail.com",
pass: "your-app-password-or-password"
```

**Important:** If you're using 2FA, you MUST use an App Password, not your regular password!

### Step 4: Test the Forgot Password Feature

1. Make sure the server is running: `npm start` in the server directory
2. Go to the login page
3. Click "Forgot Password?"
4. Enter your email address
5. Check your inbox for the password reset email

---

## Email Configuration for Other Services

### Using Gmail (Already configured above)
- Service: "gmail"
- Requires App Password if 2FA is enabled

### Using Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@outlook.com",
    pass: "your-password"
  }
});
```

### Using SendGrid
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: "your-sendgrid-api-key"
  }
});
```

### Using AWS SES
```javascript
const transporter = nodemailer.createTransport({
  host: "email-smtp.region.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-ses-username",
    pass: "your-ses-password"
  }
});
```

---

## Troubleshooting

### "Error: connect ECONNREFUSED"
- Make sure the email service is configured correctly
- Check internet connection

### "Error: Invalid login"
- Verify email and password are correct
- If using Gmail, make sure you're using an App Password, not your regular password

### Email not being sent
- Check spam/junk folder
- Verify the recipient email address is correct
- Check the server logs for error messages

---

## Testing Without Email Configuration

If you don't want to configure email, the backend will still work!

When a user clicks "Forgot Password":
1. The system will generate a temporary password
2. Show the temporary password in the server response
3. User can use that temporary password to login

Check the browser console (F12 → Console) to see the temporary password if email fails.

---

## Security Notes

⚠️ **For Production:**
1. Never commit credentials to Git
2. Use environment variables:
   ```javascript
   user: process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASSWORD
   ```
3. Add `.env` file to `.gitignore`
4. Implement password hashing (bcrypt)
5. Use JWT tokens instead of plain password reset
6. Set password reset link expiration (24 hours)

---

## Example Email Response

When a user enters their email in "Forgot Password", they will receive:

**From:** your-email@gmail.com
**Subject:** Placement Prep Tracker - Password Reset

**Email Content:**
- Greeting with user name
- Temporary password (in a highlighted box)
- Steps to reset password
- Warning that password expires in 24 hours
- Ignore notice if they didn't request reset
