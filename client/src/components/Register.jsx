import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/api";
import Captcha from "./Captcha";

export default function Register({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [captchaValid, setCaptchaValid] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValid) {
      alert("Please complete the CAPTCHA correctly.");
      return;
    }
    try {
      const res = await registerUser(form);
      if (res && (res.message || res.success)) {
        // Auto-login after successful registration
        const loginRes = await loginUser({ email: form.email, password: form.password });
        if (loginRes && loginRes.user) {
          onLogin(loginRes.user);
          navigate("/dashboard");
        } else {
          alert("Registration successful, but login failed. Please login manually.");
          navigate("/");
        }
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleForgotPassword = () => setShowForgot(true);

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${forgotEmail}`);
    setShowForgot(false);
    setForgotEmail("");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Captcha onValidate={setCaptchaValid} />

          <button type="submit">Register</button>

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            Already have an account? <Link to="/">Login</Link>
            <br />
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
              <button type="submit">Send Reset Link</button>
              <button type="button" onClick={() => setShowForgot(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
