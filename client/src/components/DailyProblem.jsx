import { useState } from "react";

export default function DailyProblem({ problem, onSolve, onSkip }) {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const languages = [
    { id: "python", name: "Python", icon: "🐍" },
    { id: "javascript", name: "JavaScript", icon: "📜" },
    { id: "java", name: "Java", icon: "☕" },
    { id: "cpp", name: "C++", icon: "⚙️" },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#4caf50";
      case "medium":
        return "#ff9800";
      case "hard":
        return "#f44336";
      default:
        return "#667eea";
    }
  };

  const handleSubmit = () => {
    if (!code.trim()) {
      alert("Please write some code!");
      return;
    }
    onSolve(code, selectedLanguage);
  };

  return (
    <div className="daily-problem">
      <div className="problem-header">
        <div className="problem-title-section">
          <h2>{problem.title}</h2>
          <span
            className="difficulty-badge"
            style={{ borderColor: getDifficultyColor(problem.difficulty) }}
          >
            {problem.difficulty}
          </span>
        </div>
        <div className="problem-stats">
          <div className="stat">
            <span className="stat-label">Acceptance</span>
            <span className="stat-value">{problem.acceptanceRate}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Submissions</span>
            <span className="stat-value">{problem.submissions}</span>
          </div>
        </div>
      </div>

      <div className="problem-tabs">
        <button
          className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`tab-btn ${activeTab === "solution" ? "active" : ""}`}
          onClick={() => setActiveTab("solution")}
        >
          Solution
        </button>
      </div>

      {activeTab === "description" && (
        <div className="problem-description">
          <p>{problem.description}</p>

          <h3>Examples:</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="example">
              <div className="example-item">
                <strong>Example {index + 1}:</strong>
                <pre>{example.input}</pre>
              </div>
              <div className="example-item">
                <strong>Output:</strong>
                <pre>{example.output}</pre>
              </div>
              <p className="explanation">{example.explanation}</p>
            </div>
          ))}

          <h3>Constraints:</h3>
          <ul>
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "solution" && (
        <div className="solution-editor">
          <div className="language-selector">
            <label>Programming Language:</label>
            <div className="language-options">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  className={`lang-btn ${selectedLanguage === lang.id ? "selected" : ""}`}
                  onClick={() => setSelectedLanguage(lang.id)}
                >
                  {lang.icon} {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Write your ${languages.find((l) => l.id === selectedLanguage)?.name} solution here...`}
              className="code-textarea"
            />
          </div>

          <div className="editor-actions">
            <button className="submit-btn" onClick={handleSubmit}>
              ✓ Submit Solution
            </button>
            <button className="run-btn">▶ Run Code</button>
            <button className="reset-btn" onClick={() => setCode("")}>
              ↻ Reset
            </button>
          </div>
        </div>
      )}

      <div className="problem-footer">
        <button className="skip-btn" onClick={onSkip}>
          ⊘ Skip Today's Challenge
        </button>
      </div>
    </div>
  );
}
