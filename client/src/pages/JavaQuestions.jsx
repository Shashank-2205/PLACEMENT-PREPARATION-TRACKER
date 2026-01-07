import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function JavaQuestions({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>☕ Java Questions</h1>
        
        <div className="dsa-content">
          <a
            className="feature-item"
            href="https://www.codechef.com/practice/java"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>👨‍💻 CodeChef Java Questions</h4>
            <p>Practice Java problems on CodeChef platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://leetcode.com/problemset/all/?page=java"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>💡 LeetCode Java Questions</h4>
            <p>Practice Java problems on LeetCode platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://codeforces.com/problemset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>⚡ CodeForces Java Questions</h4>
            <p>Practice Java problems on CodeForces platform...</p>
          </a>

          <a
            className="feature-item"
            href="https://www.hackerrank.com/domains/java"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>🎯 HackerRank Java Questions</h4>
            <p>Practice Java problems on HackerRank platform...</p>
          </a>
        </div>
      </div>
    </>
  );
}
