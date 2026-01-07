import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AnalyticsDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>📈 Analytics Dashboard</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h4>📊 My Progress</h4>
            <p>Track your preparation progress with detailed charts and statistics.</p>
          </a>
        </div>
      </div>
    </>
  );
}
