import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PythonQuestions({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>🐍 Python Questions</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="https://www.codechef.com/practice/python"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>👨‍💻 CodeChef Python Questions</h4>
            <p>Practice Python problems on CodeChef platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://leetcode.com/problemset/all/?page=python"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>💡 LeetCode Python Questions</h4>
            <p>Practice Python problems on LeetCode platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://codeforces.com/problemset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>⚡ CodeForces Python Questions</h4>
            <p>Practice Python problems on CodeForces platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://www.hackerrank.com/domains/python"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>🎯 HackerRank Python Questions</h4>
            <p>Practice Python problems on HackerRank platform...</p>
          </a>
        </div>
      </div>
    </>
  );
}
