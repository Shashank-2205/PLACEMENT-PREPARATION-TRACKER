import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar-right">
        <span className="user-info">
          {user.role === "admin" ? "🔐 Admin:" : "👤"} {user.name}
        </span>

        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user.role === "admin" && <Link to="/admin-dashboard">Admin Panel</Link>}
        <Link to="/profile">Profile</Link>
        <Link to="/coding-profiles">Coding Profiles</Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
