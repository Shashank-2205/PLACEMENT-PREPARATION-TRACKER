import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginAdmin, forgotPassword } from "../services/api";
import Captcha from "./Captcha";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [captchaValid, setCaptchaValid] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loginType, setLoginType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValid) {
      alert("Please complete the CAPTCHA correctly.");
      return;
    }
    
    setLoading(true);
    try {
      const res = loginType === "admin" ? await loginAdmin(form) : await loginUser(form);

      if (res && res.user) {
        onLogin(res.user);
        if (res.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else if (res && res.success && res.user) {
        onLogin(res.user);
        if (res.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(res?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => setShowForgot(true);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      alert("Please enter your email address");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await forgotPassword(forgotEmail);
      
      if (res.success) {
        alert(res.message || "Password reset email sent! Check your inbox.");
        if (res.note) {
          console.log("Note:", res.note);
        }
        setShowForgot(false);
        setForgotEmail("");
      } else {
        alert(res.message || "Failed to reset password");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-title">Welcome back</div>

        {/* Login Type Selection */}
        <div className="login-type-selector">
          <button
            type="button"
            className={`login-type-btn ${loginType === "user" ? "active" : ""}`}
            onClick={() => setLoginType("user")}
          >
            👤 User Login
          </button>
          <button
            type="button"
            className={`login-type-btn ${loginType === "admin" ? "active" : ""}`}
            onClick={() => setLoginType("admin")}
          >
            🔐 Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>{loginType === "admin" ? "Admin Login" : "User Login"}</h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
          />

          <Captcha onValidate={setCaptchaValid} />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : (loginType === "admin" ? "Admin Login" : "Login")}
          </button>

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            {loginType === "user" && (
              <>
                New here? <Link to="/register">Register</Link>
                <br />
              </>
            )}
            <span onClick={handleForgotPassword} style={{ cursor: "pointer", color: "#000", textDecoration: "underline" }}>Forgot Password?</span>
          </div>
        </form>
      </div>

      {showForgot && (
        <div className="modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <form onSubmit={handleForgotSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <button type="button" onClick={() => setShowForgot(false)} disabled={forgotLoading}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
