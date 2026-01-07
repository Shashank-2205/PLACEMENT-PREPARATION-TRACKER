import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import DSAQuestions from "./pages/DSAQuestions";
import SQLQuestions from "./pages/SQLQuestions";
import PythonQuestions from "./pages/PythonQuestions";
import JavaQuestions from "./pages/JavaQuestions";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import GoalTracking from "./pages/GoalTracking";
import PerformanceMetrics from "./pages/PerformanceMetrics";
import OnlineCompilers from "./pages/OnlineCompilers";
import LearningPathGenerator from "./pages/LearningPathGenerator";
import DailyChallenge from "./pages/DailyChallenge";
import PeerStudyGroups from "./pages/PeerStudyGroups";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import CodingProfiles from "./components/CodingProfiles";

const API_URL = "http://localhost:5001/api";

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Show slideshows based on page
  const showBothSlideshows = location.pathname === "/" || location.pathname === "/dashboard";
  const showSingleSlideshow = location.pathname === "/login" || location.pathname === "/profile" || location.pathname === "/coding-profiles";

  return (
    <>
      {showBothSlideshows && (
        <>
          <div className="slideshow">
            <h1>BUILD YOUR CAREER</h1>
          </div>
        </>
      )}
      <Routes>
        {/* Public */}
        <Route path="/" element={user ? <><Navbar user={user} onLogout={handleLogout} /><Home user={user} onLogout={handleLogout} /></> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/coding-profiles"
          element={
            user ? (
              <><Navbar user={user} onLogout={handleLogout} /><CodingProfiles /></>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dsa-questions"
          element={
            user ? (
              <DSAQuestions user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/sql-questions"
          element={
            user ? (
              <SQLQuestions user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/python-questions"
          element={
            user ? (
              <PythonQuestions user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/java-questions"
          element={
            user ? (
              <JavaQuestions user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/analytics-dashboard"
          element={
            user ? (
              <AnalyticsDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/goal-tracking"
          element={
            user ? (
              <GoalTracking user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/performance-metrics"
          element={
            user ? (
              <PerformanceMetrics user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/online-compilers"
          element={
            user ? (
              <OnlineCompilers user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/learning-path"
          element={
            user ? (
              <LearningPathGenerator user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/daily-challenge"
          element={
            user ? (
              <DailyChallenge user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/peer-study-groups"
          element={
            user ? (
              <PeerStudyGroups user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

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
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
