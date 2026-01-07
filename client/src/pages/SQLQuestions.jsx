import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SQLQuestions({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>🗄️ SQL Questions</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="https://www.codechef.com/practice/sql-case-studies-topic-wise"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>👨‍💻 CodeChef SQL Questions</h4>
            <p>Practice SQL problems on CodeChef platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://leetcode.com/problemset/database/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>💡 LeetCode SQL Questions</h4>
            <p>Practice SQL problems on LeetCode platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://codeforces.com/problemset?query=sql"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>⚡ CodeForces SQL Questions</h4>
            <p>Practice SQL problems on CodeForces platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://www.hackerrank.com/domains/sql"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>🎯 HackerRank SQL Questions</h4>
            <p>Practice SQL problems on HackerRank platform...</p>
          </a>
        </div>
      </div>
    </>
  );
}
