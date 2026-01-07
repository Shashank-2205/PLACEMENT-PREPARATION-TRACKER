import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function GoalTracking({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>🎯 Goal Tracking</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h4>🎯 Set Goal</h4>
            <p>Set and monitor your learning goals with progress indicators.</p>
          </a>
        </div>
      </div>
    </>
  );
}
