export default function StreakCounter({ stats }) {
  const today = new Date().toDateString();
  const lastCompleted = new Date(stats.lastCompletedDate).toDateString();
  const completedToday = today === lastCompleted;

  return (
    <div className="streak-counter">
      <h2>📊 Your Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card current-streak">
          <div className="stat-content">
            <span className="stat-label">Current Streak</span>
            <div className="stat-display">
              <span className="streak-number">🔥 {stats.currentStreak}</span>
              <span className="streak-days">days</span>
            </div>
          </div>
          <div className="streak-status">
            {completedToday ? (
              <span className="completed-badge">✓ Completed Today</span>
            ) : (
              <span className="pending-badge">⏳ Complete Today</span>
            )}
          </div>
        </div>

        <div className="stat-card longest-streak">
          <span className="stat-label">Longest Streak</span>
          <span className="stat-number">⭐ {stats.longestStreak}</span>
          <span className="stat-subtext">days</span>
        </div>

        <div className="stat-card problems-solved">
          <span className="stat-label">Problems Solved</span>
          <span className="stat-number">✓ {stats.problemsSolved}</span>
          <span className="stat-subtext">total</span>
        </div>

        <div className="stat-card total-attempts">
          <span className="stat-label">Total Attempts</span>
          <span className="stat-number">🎯 {stats.totalAttempts}</span>
          <span className="stat-subtext">submissions</span>
        </div>
      </div>

      <div className="streak-motivation">
        {stats.currentStreak >= 7 && (
          <div className="motivation-message success">
            <span>🚀 Amazing! You're on a {stats.currentStreak}-day streak!</span>
          </div>
        )}
        {stats.currentStreak === 0 && (
          <div className="motivation-message warning">
            <span>💪 Start your streak today! Complete the daily challenge.</span>
          </div>
        )}
        {stats.currentStreak > 0 && stats.currentStreak < 7 && (
          <div className="motivation-message info">
            <span>🎯 Keep going! {7 - stats.currentStreak} more days to earn the Week Warrior badge!</span>
          </div>
        )}
      </div>

      <div className="streak-chart">
        <h3>Last 7 Days Activity</h3>
        <div className="activity-bars">
          {[...Array(7)].map((_, i) => {
            const isCompleted = Math.random() > 0.3; // Mock data
            return (
              <div
                key={i}
                className={`activity-bar ${isCompleted ? "completed" : "missed"}`}
                title={`Day ${i + 1}: ${isCompleted ? "Completed" : "Missed"}`}
              >
                {isCompleted && <span>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
