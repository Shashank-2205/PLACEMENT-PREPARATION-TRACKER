import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DSAQuestions({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>🏗️ DSA Questions</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="https://www.codechef.com/practice?search=dsa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>👨‍💻 CodeChef DSA Questions</h4>
            <p>Practice DSA problems on CodeChef platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://leetcode.com/problemset/all/?page=1&topicSlugs=data-structure"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>💡 LeetCode DSA Questions</h4>
            <p>Practice DSA problems on LeetCode platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://codeforces.com/problemset?tags=data%20structures"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>⚡ CodeForces DSA Questions</h4>
            <p>Practice DSA problems on CodeForces platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://www.hackerrank.com/domains/data-structures"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>🎯 HackerRank DSA Questions</h4>
            <p>Practice DSA problems on HackerRank platform...</p>
          </a>
        </div>
      </div>
    </>
  );
}
