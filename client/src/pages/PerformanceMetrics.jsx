import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PerformanceMetrics({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>📊 Performance Metrics</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h4>📈 My Performance</h4>
            <p>Monitor your improvement over time with detailed performance analytics.</p>
          </a>
        </div>
      </div>
    </>
  );
}
