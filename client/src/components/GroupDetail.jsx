import { useState } from "react";
import DiscussionForum from "./DiscussionForum";
import CodeSharing from "./CodeSharing";
import GroupProgress from "./GroupProgress";

export default function GroupDetail({ group, onBack, onJoinGroup }) {
  const [activeTab, setActiveTab] = useState("curriculum"); // Start with curriculum tab
  const [expandedTopic, setExpandedTopic] = useState(null);

  console.log("🚀🚀🚀 GroupDetail RENDERING! Group:", group?.name);
  console.log("🚀🚀🚀 Curriculum exists?", !!group?.curriculum);
  console.log("🚀🚀🚀 Curriculum array:", group?.curriculum);

  if (!group) {
    return <div style={{padding: '40px', fontSize: '24px', color: 'red', background: 'yellow'}}>⚠️ No group data available</div>;
  }

  return (
    <div className="group-detail" style={{background: 'white', minHeight: '100vh', padding: '20px'}}>
      <button className="back-button-detail" onClick={onBack}>
        ← Back to Groups
      </button>

      {/* Group Header */}
      <div className="group-detail-header" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '30px', borderRadius: '12px', marginBottom: '20px'}}>
        <div className="header-content" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <span className="header-icon" style={{fontSize: '3rem'}}>{group.icon}</span>
          <div className="header-info">
            <h2 style={{margin: 0, fontSize: '2rem'}}>{group.name}</h2>
            <p className="header-topic" style={{margin: '5px 0', opacity: 0.9}}>{group.topic}</p>
            <p className="header-created" style={{margin: '5px 0', fontSize: '0.9rem', opacity: 0.8}}>
              Created by <strong>{group.createdBy}</strong> on {group.createdDate}
            </p>
          </div>
        </div>
        {!group.joined && (
          <button className="join-btn-header" onClick={onJoinGroup} style={{marginTop: '15px'}}>
            + Join This Group
          </button>
        )}
        {group.joined && (
          <span className="joined-badge" style={{marginTop: '15px', display: 'inline-block'}}>✓ Joined</span>
        )}
      </div>

      {/* Description */}
      <div className="group-description-box">
        <h3>About This Group</h3>
        <p>{group.description}</p>
      </div>

      {/* Tabs */}
      <div className="group-tabs" style={{display: 'flex', borderBottom: '2px solid #e0e0e0', background: '#f9f9f9', overflowX: 'auto', marginBottom: '20px'}}>
        <button
          className={`tab-button ${activeTab === "curriculum" ? "active" : ""}`}
          onClick={() => setActiveTab("curriculum")}
          style={{
            padding: '18px 25px',
            border: 'none',
            background: activeTab === "curriculum" ? 'white' : 'transparent',
            color: activeTab === "curriculum" ? '#667eea' : '#666',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === "curriculum" ? '3px solid #667eea' : '3px solid transparent'
          }}
        >
          📚 Topics & Curriculum
        </button>
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
          style={{
            padding: '18px 25px',
            border: 'none',
            background: activeTab === "overview" ? 'white' : 'transparent',
            color: activeTab === "overview" ? '#667eea' : '#666',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === "overview" ? '3px solid #667eea' : '3px solid transparent'
          }}
        >
          📋 Overview
        </button>
        <button
          className={`tab-button ${activeTab === "forum" ? "active" : ""}`}
          onClick={() => setActiveTab("forum")}
          style={{
            padding: '18px 25px',
            border: 'none',
            background: activeTab === "forum" ? 'white' : 'transparent',
            color: activeTab === "forum" ? '#667eea' : '#666',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === "forum" ? '3px solid #667eea' : '3px solid transparent'
          }}
        >
          💬 Discussion Forum ({group.discussions.length})
        </button>
        <button
          className={`tab-button ${activeTab === "members" ? "active" : ""}`}
          onClick={() => setActiveTab("members")}
          style={{
            padding: '18px 25px',
            border: 'none',
            background: activeTab === "members" ? 'white' : 'transparent',
            color: activeTab === "members" ? '#667eea' : '#666',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === "members" ? '3px solid #667eea' : '3px solid transparent'
          }}
        >
          👥 Members ({group.memberList.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{background: 'white', padding: '25px', borderRadius: '8px', minHeight: '500px'}}>
        {activeTab === "curriculum" && (
          <div className="curriculum-section">
            <h3 style={{fontSize: '1.8rem', color: '#2d3748', marginBottom: '10px'}}>📚 Learning Curriculum</h3>
            <p className="curriculum-description" style={{fontSize: '1rem', color: '#718096', marginBottom: '25px'}}>
              Track your progress through each topic and subtopic. Click on any topic to expand and see detailed subtopics.
            </p>
            
            {group.curriculum && group.curriculum.length > 0 ? (
              <div className="curriculum-list" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {group.curriculum.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex} 
                    className={`curriculum-topic ${topic.completed ? 'completed' : ''}`}
                    style={{
                      background: 'white',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      className="topic-header"
                      onClick={() => setExpandedTopic(expandedTopic === topicIndex ? null : topicIndex)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px',
                        cursor: 'pointer',
                        background: expandedTopic === topicIndex ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f7fafc',
                        color: expandedTopic === topicIndex ? 'white' : '#2d3748',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div className="topic-info" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <span className="topic-icon" style={{fontSize: '2rem'}}>{topic.icon}</span>
                        <div>
                          <h4 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px'}}>{topic.name}</h4>
                          <span className="subtopic-count" style={{fontSize: '0.9rem', opacity: 0.9}}>
                            {topic.subtopics.filter(st => st.completed).length}/{topic.subtopics.length} completed • {topic.subtopics.reduce((sum, s) => sum + s.problems, 0)} problems
                          </span>
                        </div>
                      </div>
                      <span className="expand-icon" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                        {expandedTopic === topicIndex ? '−' : '+'}
                      </span>
                    </div>
                    
                    {expandedTopic === topicIndex && (
                      <div className="subtopics-list" style={{padding: '15px', background: '#fafafa'}}>
                        {topic.subtopics.map((subtopic, subIndex) => (
                          <div 
                            key={subIndex} 
                            className={`subtopic-item ${subtopic.completed ? 'completed' : ''}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '15px',
                              marginBottom: '10px',
                              background: 'white',
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px'
                            }}
                          >
                            <div className="subtopic-content" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                              <span className="subtopic-status" style={{
                                fontSize: '1.5rem',
                                color: subtopic.completed ? '#48bb78' : '#cbd5e0'
                              }}>
                                {subtopic.completed ? '✓' : '○'}
                              </span>
                              <div>
                                <span className="subtopic-name" style={{fontSize: '1rem', fontWeight: '500', color: '#2d3748', display: 'block', marginBottom: '4px'}}>{subtopic.name}</span>
                                <span className="problem-count" style={{fontSize: '0.85rem', color: '#718096'}}>
                                  📝 {subtopic.problems} problems
                                </span>
                              </div>
                            </div>
                            <button 
                              style={{
                                padding: '8px 20px',
                                background: subtopic.completed ? '#48bb78' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {subtopic.completed ? 'Review' : 'Start'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-curriculum" style={{textAlign: 'center', padding: '40px', color: '#718096'}}>
                <p>No curriculum available for this group yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <span className="icon">👥</span>
                <h4>Total Members</h4>
                <p className="big-number">{group.members}</p>
              </div>
              <div className="overview-card">
                <span className="icon">💬</span>
                <h4>Discussions</h4>
                <p className="big-number">{group.discussions.length}</p>
              </div>
              <div className="overview-card">
                <span className="icon">⏱️</span>
                <h4>Last Active</h4>
                <p>{group.lastActive}</p>
              </div>
              <div className="overview-card">
                <span className="icon">📈</span>
                <h4>Avg Progress</h4>
                <p>{group.progress.averageMemberProgress}%</p>
              </div>
            </div>

            <div className="group-info-section">
              <h3>Group Statistics</h3>
              <div className="stat-item">
                <span>Total Topics to Cover</span>
                <strong>{group.progress.totalTopics}</strong>
              </div>
              <div className="stat-item">
                <span>Topics Completed</span>
                <strong>{group.progress.topicsCompleted}</strong>
              </div>
              <div className="progress-bar-large">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(group.progress.topicsCompleted / group.progress.totalTopics) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="progress-percentage">
                {Math.round((group.progress.topicsCompleted / group.progress.totalTopics) * 100)}% Complete
              </p>
            </div>
          </div>
        )}

        {activeTab === "forum" && (
          <DiscussionForum discussions={group.discussions} groupId={group.id} />
        )}

        {activeTab === "code" && (
          <CodeSharing groupId={group.id} />
        )}

        {activeTab === "progress" && (
          <GroupProgress progress={group.progress} members={group.memberList} />
        )}

        {activeTab === "members" && (
          <div className="members-section">
            <h3>Group Members</h3>
            <div className="members-list">
              {group.memberList.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-avatar">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="member-role">
                      <span className={`role-badge ${member.role.toLowerCase()}`}>
                        {member.role}
                      </span>
                    </p>
                    <p className="join-date">Joined {member.joinedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
