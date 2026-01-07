import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home({ user, onLogout }) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [codingProgress, setCodingProgress] = useState("");

  // Handle LinkedIn URL - open in new tab
  const handleLinkedinUrlChange = (e) => {
    const value = e.target.value;
    setLinkedinUrl(value);
    
    if (value.includes("linkedin.com")) {
      window.open(value, "_blank");
      setLinkedinUrl("");
    }
  };

  // Handle Coding Platform URL - open in new tab
  const handleCodingPlatformChange = (e) => {
    const value = e.target.value;
    setCodingProgress(value);
    
    if (value.includes("codeforces.com") || value.includes("codechef.com") || 
        value.includes("codolio.com") || value.includes("leetcode.com")) {
      window.open(value, "_blank");
      setCodingProgress("");
    }
  };

  return (
    <div className="home-container">
      {/* Features Section */}
      <section className="collapsible-section">
        <button 
          className="section-title"
          onClick={() => setShowFeatures(!showFeatures)}
        >
          ✨ Features {showFeatures ? "▼" : "▶"}
        </button>
        
        {showFeatures && (
          <div className="section-content">
            <Link to="/dashboard" className="feature-item">
              <h4>📚 Topic Tracking</h4>
              <p>Track your progress across various subjects including DSA, DBMS, Operating Systems, and more.</p>
            </Link>
            <Link to="/dashboard" className="feature-item">
              <h4>📝 Notes System</h4>
              <p>Add and manage notes for each topic to reinforce your learning.</p>
            </Link>
            <Link to="/analytics-dashboard" className="feature-item">
              <h4>📊 Progress Analytics</h4>
              <p>Visualize your preparation progress with charts and statistics.</p>
            </Link>
            <Link to="/dashboard" className="feature-item">
              <h4>🎯 Personalized Dashboard</h4>
              <p>Get a comprehensive view of your preparation status and upcoming goals.</p>
            </Link>
          </div>
        )}
      </section>

      {/* Personal Information Section */}
      <section className="collapsible-section">
        <button 
          className="section-title"
          onClick={() => setShowPersonalInfo(!showPersonalInfo)}
        >
          👤 Personal Information {showPersonalInfo ? "▼" : "▶"}
        </button>
        
        {showPersonalInfo && (
          <div className="section-content">
            <div className="personal-item">
              <label>LinkedIn Profile:</label>
              <input 
                type="text" 
                placeholder="Paste your LinkedIn profile URL"
                value={linkedinUrl}
                onChange={handleLinkedinUrlChange}
              />
            </div>

            <div className="personal-item">
              <label>Coding Platform (Codeforces/Codechef/Codolio/LeetCode):</label>
              <input 
                type="text" 
                placeholder="Paste your Codeforces, Codechef, Codolio, or LeetCode profile URL"
                value={codingProgress}
                onChange={handleCodingPlatformChange}
              />
            </div>
          </div>
        )}
      </section>

      {/* Practice Questions Section */}
      <section className="collapsible-section">
        <button 
          className="section-title"
          onClick={() => setShowPractice(!showPractice)}
        >
          🎯 Practice Questions {showPractice ? "▼" : "▶"}
        </button>
        
        {showPractice && (
          <div className="section-content">
            <div className="feature-item">
              <h4>📖 Problem-Solving</h4>
              <p>Practice coding problems from various difficulty levels to strengthen your problem-solving skills.</p>
            </div>
            <div className="feature-item">
              <h4>🏗️ <Link to="/dsa-questions" style={{color: 'inherit', textDecoration: 'none'}}>DSA Questions</Link></h4>
              <p>Master Data Structures and Algorithms with curated question sets and solutions.</p>
            </div>
            <div className="feature-item">
              <h4>🗄️ <Link to="/sql-questions" style={{color: 'inherit', textDecoration: 'none'}}>SQL Questions</Link></h4>
              <p>Practice SQL queries and database concepts with real-world scenarios.</p>
            </div>
            <div className="feature-item">
              <h4>🐍 <Link to="/python-questions" style={{color: 'inherit', textDecoration: 'none'}}>Python Questions</Link></h4>
              <p>Strengthen your Python programming skills with practical coding challenges.</p>
            </div>
            <div className="feature-item">
              <h4>☕ <Link to="/java-questions" style={{color: 'inherit', textDecoration: 'none'}}>Java Questions</Link></h4>
              <p>Master Java programming with object-oriented concepts and coding exercises.</p>
            </div>
          </div>
        )}
      </section>

      {/* Progress Tracking Section */}
      <section className="collapsible-section">
        <button 
          className="section-title"
          onClick={() => setShowProgress(!showProgress)}
        >
          📊 Progress Tracking {showProgress ? "▼" : "▶"}
        </button>
        
        {showProgress && (
          <div className="section-content">
            <div className="feature-item">
              <h4>📈 <Link to="/analytics-dashboard" style={{color: 'inherit', textDecoration: 'none'}}>Analytics Dashboard</Link></h4>
              <p>Track your preparation progress with detailed charts and statistics.</p>
            </div>
            <div className="feature-item">
              <h4>🎯 <Link to="/goal-tracking" style={{color: 'inherit', textDecoration: 'none'}}>Goal Tracking</Link></h4>
              <p>Set and monitor your learning goals with progress indicators.</p>
            </div>
            <div className="feature-item">
              <h4>📊 <Link to="/performance-metrics" style={{color: 'inherit', textDecoration: 'none'}}>Performance Metrics</Link></h4>
              <p>Monitor your improvement over time with detailed performance analytics.</p>
            </div>
          </div>
        )}
      </section>

      {/* Online Code Compilers (link) */}
      <section className="collapsible-section">
        <Link
          to="/online-compilers"
          className="section-title"
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          💻 Online Code Compilers
        </Link>
      </section>

      {/* Personalized Learning Path Generator */}
      <section className="collapsible-section">
        <Link
          to="/learning-path"
          className="section-title"
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          🎯 Personalized Learning Path Generator
        </Link>
      </section>

      {/* Daily Challenge System */}
      <section className="collapsible-section">
        <Link
          to="/daily-challenge"
          className="section-title"
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          🎯 Daily Challenge System
        </Link>
      </section>

      {/* Peer Study Groups */}
      <section className="collapsible-section">
        <Link
          to="/peer-study-groups"
          className="section-title"
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          👥 Peer Study Groups
        </Link>
      </section>

    </div>
  );
}