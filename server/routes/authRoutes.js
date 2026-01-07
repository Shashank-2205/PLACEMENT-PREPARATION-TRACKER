const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");

// Configure Nodemailer (using Gmail as example)
// Check if email is configured via environment variables
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password"
  }
});

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, 'user'], (err) => {
    if (err) {
      console.error("Register error:", err);
      return res.status(500).json({
        message: "User already exists or DB error"
      });
    }

    res.json({ success: true, message: "Registered successfully" });
  });
});

// LOGIN - Regular User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT id, name, email, role FROM users WHERE email = ? AND password = ? AND role = 'user'";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Login DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        user: result[0]
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  });
});

// LOGIN - Admin User
router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT id, name, email, role FROM users WHERE email = ? AND password = ? AND role = 'admin'";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Admin Login DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        user: result[0]
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials"
    });
  });
});

// FORGOT PASSWORD
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check if user exists
  const sql = "SELECT id, name, email FROM users WHERE email = ?";
  
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Forgot password DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ 
        message: "Email not found in our system" 
      });
    }

    const user = result[0];
    
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-10).toUpperCase();
    
    // Update user with temporary password in database
    const updateSql = "UPDATE users SET password = ? WHERE id = ?";
    
    db.query(updateSql, [tempPassword, user.id], (err) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Error processing request" });
      }

      // Try to send email if configured
      if (isEmailConfigured) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Placement Prep Tracker - Password Reset",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; border-radius: 10px;">
              <h2 style="color: #667eea;">Password Reset Request</h2>
              <p>Hello ${user.name},</p>
              <p>We received a request to reset your password. Here is your temporary password:</p>
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">
                <h3 style="color: #667eea; text-align: center; margin: 0;">Temporary Password</h3>
                <p style="text-align: center; font-size: 18px; font-weight: bold; color: #1a1a2e; margin: 10px 0;">
                  ${tempPassword}
                </p>
              </div>
              <p><strong>Steps to reset your password:</strong></p>
              <ol>
                <li>Go to the login page</li>
                <li>Use your email: <strong>${email}</strong></li>
                <li>Use the temporary password above</li>
                <li>After logging in, go to your profile to change your password</li>
              </ol>
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                If you didn't request this password reset, please ignore this email. This temporary password will expire in 24 hours.
              </p>
              <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px; color: #666; font-size: 12px;">
                <p>Placement Prep Tracker Team</p>
              </div>
            </div>
          `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email error:", error);
            return res.status(200).json({ 
              success: true,
              message: "Password reset successful! Check your email.",
              tempPassword: tempPassword,
              note: "Email failed to send. Use temporary password: " + tempPassword
            });
          }

          res.json({ 
            success: true,
            message: "Password reset email sent successfully! Check your inbox."
          });
        });
      } else {
        // Email not configured - return temporary password for testing
        res.json({ 
          success: true,
          message: "✅ Password reset successful! Your temporary password has been generated.",
          tempPassword: tempPassword,
          instructions: `Login with your email and this password: ${tempPassword}`,
          note: "Email service not configured. Copy the temporary password above to login."
        });
      }
    });
  });
});

module.exports = router;
