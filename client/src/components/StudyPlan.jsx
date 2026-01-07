import { useState } from "react";

export default function StudyPlan({ plan, quizResults, onRetake }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleExpand = (topic) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="study-plan-container">
      <div className="results-header">
        <h1>📊 Your Personalized Learning Path</h1>
        <div className="overall-score">
          <div className="score-circle">
            <span className="score-number">{plan.overallScore}%</span>
            <span className="score-label">Overall Score</span>
          </div>
        </div>
      </div>

      <div className="performance-summary">
        <div className="summary-card strong">
          <h3>💪 Strong Areas ({plan.strongAreas.length})</h3>
          {plan.strongAreas.length > 0 ? (
            <ul>
              {plan.strongAreas.map((area) => (
                <li key={area.topic}>
                  {area.topic} - <span className="score">{area.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No strong areas yet. Keep practicing!</p>
          )}
        </div>

        <div className="summary-card medium">
          <h3>🎯 Medium Areas ({plan.mediumAreas.length})</h3>
          {plan.mediumAreas.length > 0 ? (
            <ul>
              {plan.mediumAreas.map((area) => (
                <li key={area.topic}>
                  {area.topic} - <span className="score">{area.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medium areas. Great job!</p>
          )}
        </div>

        <div className="summary-card weak">
          <h3>🚀 Areas to Improve ({plan.weakAreas.length})</h3>
          {plan.weakAreas.length > 0 ? (
            <ul>
              {plan.weakAreas.map((area) => (
                <li key={area.topic}>
                  {area.topic} - <span className="score">{area.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>All areas are strong! You're doing great!</p>
          )}
        </div>
      </div>

      <div className="study-recommendations">
        <h2>📚 Recommended Study Plan</h2>
        <p className="estimated-time">
          ⏱️ Total Estimated Hours: <strong>{plan.totalEstimatedHours} hours</strong>
        </p>

        {plan.recommendedTopics.length > 0 ? (
          <div className="topics-list">
            {plan.recommendedTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div
                  className="topic-header"
                  onClick={() => toggleExpand(topic.topic)}
                >
                  <div className="topic-info">
                    <h3>{topic.topic}</h3>
                    <div className="topic-meta">
                      <span className={`priority-badge priority-${topic.priority.toLowerCase()}`}>
                        {topic.priority} Priority
                      </span>
                      <span className="difficulty-info">{topic.difficulty}</span>
                      <span className="hours-info">~{topic.estimatedHours} hours</span>
                    </div>
                  </div>
                  <span className="expand-icon">
                    {expandedTopic === topic.topic ? "▼" : "▶"}
                  </span>
                </div>

                {expandedTopic === topic.topic && (
                  <div className="topic-resources">
                    <h4>Recommended Resources:</h4>
                    <div className="resources-list">
                      {topic.resources.map((resource, idx) => (
                        <div key={idx} className="resource-item">
                          <span className="resource-type">{resource.type}</span>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            {resource.name}
                          </a>
                        </div>
                      ))}
                    </div>

                    <div className="study-tips">
                      <h5>📝 Study Tips:</h5>
                      <ul>
                        <li>Start with easier concepts and gradually increase difficulty</li>
                        <li>Practice problems after learning each concept</li>
                        <li>Review weak areas regularly using spaced repetition</li>
                        <li>Track your progress and adjust study pace accordingly</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-recommendations">
            <p>🎉 Great job! You have strong fundamentals across all topics. Focus on advanced topics and system design!</p>
          </div>
        )}
      </div>

      <div className="adaptive-note">
        <p>
          <strong>💡 Adaptive Learning:</strong> Your difficulty levels will adjust based on your performance as you study. Start with the assigned level and move to harder problems as you gain confidence!
        </p>
      </div>

      <div className="plan-actions">
        <button className="retake-btn" onClick={onRetake}>
          Retake Assessment
        </button>
        <button className="start-studying-btn">Start Studying</button>
      </div>
    </div>
  );
}
