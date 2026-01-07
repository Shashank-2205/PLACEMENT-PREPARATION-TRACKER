import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      joinDate: "2024-01-15",
      progress: 75,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      joinDate: "2024-02-20",
      progress: 60,
    },
    {
      id: 3,
      name: "Priya Kumar",
      email: "priya@example.com",
      role: "user",
      joinDate: "2024-03-10",
      progress: 85,
    },
    {
      id: 4,
      name: "Arjun Singh",
      email: "arjun@example.com",
      role: "user",
      joinDate: "2024-03-15",
      progress: 45,
    },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in all fields");
      return;
    }
    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split("T")[0],
      progress: 0,
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "user" });
    alert("User added successfully!");
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      alert("User deleted successfully!");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (!editingUser.name || !editingUser.email) {
      alert("Please fill in all fields");
      return;
    }
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
    alert("User updated successfully!");
  };

  const stats = {
    totalUsers: users.length,
    averageProgress: Math.round(
      users.reduce((sum, u) => sum + u.progress, 0) / users.length
    ),
    activeUsers: users.filter((u) => u.progress > 50).length,
  };

  return (
    <div className="page-container">
      <Navbar user={user} onLogout={onLogout} />
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>🔐 Admin Dashboard</h1>
          <p>Manage users, monitor progress, and control system permissions</p>
        </div>

        {/* Stats Overview */}
        <div className="admin-stats">
          <div className="stat-box">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.averageProgress}%</h3>
              <p>Avg Progress</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.activeUsers}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📋 User Overview
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add User
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="admin-tab-content">
          {/* User Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-panel">
              <h2>User Management</h2>
              {editingUser ? (
                <div className="edit-form">
                  <h3>Edit User</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="form-actions">
                    <button
                      className="btn-save"
                      onClick={handleUpdateUser}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Progress</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td className="user-name">{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`role-badge role-${u.role}`}>
                              {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                            </span>
                          </td>
                          <td>{u.joinDate}</td>
                          <td>
                            <div className="progress-mini">
                              <div
                                className="progress-bar"
                                style={{ width: `${u.progress}%` }}
                              />
                              <span>{u.progress}%</span>
                            </div>
                          </td>
                          <td className="actions">
                            <button
                              className="btn-edit"
                              onClick={() => handleEditUser(u)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Add User Tab */}
          {activeTab === "add" && (
            <div className="tab-panel">
              <h2>Add New User</h2>
              <div className="add-user-form">
                <input
                  type="text"
                  placeholder="User Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin User</option>
                </select>
                <button className="btn-submit" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="tab-panel">
              <h2>Admin Settings</h2>
              <div className="settings-section">
                <h3>System Settings</h3>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked /> Enable User Registration
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked /> Enable Email Notifications
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Maintenance Mode
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Permissions</h3>
                <p className="permission-note">
                  ✅ Read Access: View all user data and progress
                </p>
                <p className="permission-note">
                  ✏️ Write Access: Edit, delete, and create user accounts
                </p>
                <p className="permission-note">
                  🔧 Admin Access: Full system control and configuration
                </p>
              </div>

              <div className="settings-section">
                <button className="btn-save">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
