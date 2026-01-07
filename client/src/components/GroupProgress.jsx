import { useState } from "react";

export default function GroupProgress({ progress, groupMembers = [] }) {
  const [memberDetails, setMemberDetails] = useState([
    {
      id: 1,
      name: "Priya Kumar",
      role: "Admin",
      topicsCompleted: 18,
      problemsSolved: 42,
      contribution: 12,
      joinedDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Arjun Singh",
      role: "Moderator",
      topicsCompleted: 15,
      problemsSolved: 35,
      contribution: 8,
      joinedDate: "Feb 2024",
    },
    {
      id: 3,
      name: "Neha Patel",
      role: "Member",
      topicsCompleted: 12,
      problemsSolved: 28,
      contribution: 5,
      joinedDate: "Mar 2024",
    },
    {
      id: 4,
      name: "Rahul Verma",
      role: "Member",
      topicsCompleted: 10,
      problemsSolved: 22,
      contribution: 3,
      joinedDate: "Mar 2024",
    },
  ]);

  const topics = [
    { name: "Array & String", percentage: 85 },
    { name: "Linked List", percentage: 70 },
    { name: "Tree & BST", percentage: 60 },
    { name: "Graph", percentage: 45 },
    { name: "DP", percentage: 35 },
  ];

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#2196f3";
    if (percentage >= 40) return "#ff9800";
    return "#f44336";
  };

  return (
    <div className="group-progress">
      {/* Overall Group Stats */}
      <div className="group-stats-overview">
        <h3>Group Progress Overview</h3>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{progress?.topicsCompleted || 0}</div>
            <div className="stat-label">Topics Completed</div>
            <div className="stat-total">of {progress?.totalTopics || 20}</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {Math.round(progress?.averageMemberProgress || 0)}%
            </div>
            <div className="stat-label">Avg Member Progress</div>
            <div className="stat-total">Across all members</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{memberDetails.length}</div>
            <div className="stat-label">Active Members</div>
            <div className="stat-total">Contributing</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {memberDetails.reduce((sum, m) => sum + m.problemsSolved, 0)}
            </div>
            <div className="stat-label">Problems Solved</div>
            <div className="stat-total">Group total</div>
          </div>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="topic-progress-section">
        <h3>Topic Completion Status</h3>

        <div className="topics-list">
          {topics.map((topic, index) => (
            <div key={index} className="topic-item">
              <div className="topic-name">{topic.name}</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${topic.percentage}%`,
                    backgroundColor: getProgressColor(topic.percentage),
                  }}
                >
                  <span className="progress-text">{topic.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Contributions */}
      <div className="member-progress-section">
        <h3>Member Progress & Contributions</h3>

        <div className="members-progress-list">
          {memberDetails.map((member) => (
            <div key={member.id} className="member-progress-card">
              <div className="member-header">
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{member.role}</span>
                  <span className="joined-date">Joined {member.joinedDate}</span>
                </div>
              </div>

              <div className="member-stats">
                <div className="stat-item">
                  <span className="stat-label">Topics</span>
                  <span className="stat-value">{member.topicsCompleted}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Problems</span>
                  <span className="stat-value">{member.problemsSolved}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Contributions</span>
                  <span className="stat-value">{member.contribution}</span>
                </div>
              </div>

              <div className="member-progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(member.topicsCompleted / 20) * 100}%`,
                    backgroundColor: getProgressColor((member.topicsCompleted / 20) * 100),
                  }}
                />
              </div>

              <span className="progress-percentage">
                {Math.round((member.topicsCompleted / 20) * 100)}% Complete
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Group Milestones */}
      <div className="milestones-section">
        <h3>Group Milestones & Achievements</h3>

        <div className="milestones-grid">
          <div className="milestone-card completed">
            <span className="milestone-icon">🎯</span>
            <span className="milestone-name">First 50 Problems</span>
            <span className="milestone-status">Completed</span>
          </div>

          <div className="milestone-card completed">
            <span className="milestone-icon">📈</span>
            <span className="milestone-name">50% Group Completion</span>
            <span className="milestone-status">Completed</span>
          </div>

          <div className="milestone-card in-progress">
            <span className="milestone-icon">🏆</span>
            <span className="milestone-name">100+ Problems Solved</span>
            <span className="milestone-status">80/100</span>
          </div>

          <div className="milestone-card locked">
            <span className="milestone-icon">⭐</span>
            <span className="milestone-name">All Topics Mastered</span>
            <span className="milestone-status">Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
