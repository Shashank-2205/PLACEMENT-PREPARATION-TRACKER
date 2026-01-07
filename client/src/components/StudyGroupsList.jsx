export default function StudyGroupsList({ groups, onViewGroup, onJoinGroup }) {
  const myGroups = groups.filter((g) => g.joined);
  const availableGroups = groups.filter((g) => !g.joined);

  return (
    <div className="study-groups-list">
      {/* My Study Groups */}
      <section className="groups-section">
        <h2>📚 My Study Groups ({myGroups.length})</h2>

        {myGroups.length > 0 ? (
          <div className="groups-grid">
            {myGroups.map((group) => (
              <div key={group.id} className="group-card my-group">
                <div className="group-header">
                  <span className="group-icon">{group.icon}</span>
                  <div className="group-title-section">
                    <h3>{group.name}</h3>
                    <p className="group-topic">{group.topic}</p>
                  </div>
                </div>

                <p className="group-description">{group.description}</p>

                <div className="group-stats">
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-text">{group.members} members</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-text">{group.lastActive}</span>
                  </div>
                </div>

                <div className="group-progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(group.progress.topicsCompleted / group.progress.totalTopics) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  {group.progress.topicsCompleted}/{group.progress.totalTopics} Topics Completed
                </p>

                <button
                  className="view-group-btn"
                  onClick={() => {
                    console.log("🚀 CLICK DETECTED on:", group.name);
                    console.log("🚀 Calling onViewGroup with:", group);
                    const result = onViewGroup(group);
                    console.log("🚀 onViewGroup returned:", result);
                  }}
                  style={{position: 'relative', zIndex: 100}}
                >
                  View Group →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't joined any study groups yet.</p>
            <p>Scroll down to browse available groups!</p>
          </div>
        )}
      </section>

      {/* Browse Available Groups */}
      <section className="groups-section">
        <h2>🌍 Browse Study Groups ({availableGroups.length})</h2>

        {availableGroups.length > 0 ? (
          <div className="groups-grid">
            {availableGroups.map((group) => (
              <div key={group.id} className="group-card available-group">
                <div className="group-header">
                  <span className="group-icon">{group.icon}</span>
                  <div className="group-title-section">
                    <h3>{group.name}</h3>
                    <p className="group-topic">{group.topic}</p>
                  </div>
                </div>

                <p className="group-description">{group.description}</p>

                <div className="group-stats">
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-text">{group.members} members</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">📅</span>
                    <span className="stat-text">Created {group.createdDate}</span>
                  </div>
                </div>

                <div className="group-progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(group.progress.topicsCompleted / group.progress.totalTopics) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  {group.progress.topicsCompleted}/{group.progress.totalTopics} Topics Completed
                </p>

                <div className="group-actions">
                  <button
                    className="join-btn"
                    onClick={() => onJoinGroup(group.id)}
                  >
                    + Join Group
                  </button>
                  <button
                    className="view-preview-btn"
                    onClick={() => {
                      console.log("Previewing group:", group);
                      onViewGroup(group);
                    }}
                  >
                    Preview →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No available groups to join at the moment.</p>
          </div>
        )}
      </section>
    </div>
  );
}


