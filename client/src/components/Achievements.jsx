export default function Achievements({ achievements }) {
  return (
    <div className="achievements">
      <h2>🏅 Achievements & Badges</h2>

      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`achievement-card ${achievement.unlocked ? "unlocked" : "locked"}`}
          >
            <div className="achievement-icon">
              {achievement.unlocked ? (
                <span className="badge-emoji">🏆</span>
              ) : (
                <span className="locked-emoji">🔒</span>
              )}
            </div>

            <div className="achievement-info">
              <h4>{achievement.name}</h4>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.unlocked && (
                <span className="unlocked-date">Unlocked on {achievement.date}</span>
              )}
              {!achievement.unlocked && (
                <span className="locked-text">🔓 Keep going!</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="achievement-stats">
        <div className="stat">
          <span className="stat-count">{achievements.filter((a) => a.unlocked).length}</span>
          <span className="stat-text">Badges Earned</span>
        </div>
        <div className="stat">
          <span className="stat-count">{achievements.filter((a) => !a.unlocked).length}</span>
          <span className="stat-text">Badges Locked</span>
        </div>
      </div>

      <div className="upcoming-achievements">
        <h3>🎯 Upcoming Milestones</h3>
        <ul>
          <li>
            <span className="milestone-icon">7️⃣</span>
            <span className="milestone-text">7-Day Streak</span>
            <span className="progress">{Math.min(5, 7)} / 7 days</span>
          </li>
          <li>
            <span className="milestone-icon">3️⃣</span>
            <span className="milestone-text">30-Day Streak</span>
            <span className="progress">{5} / 30 days</span>
          </li>
          <li>
            <span className="milestone-icon">1️⃣</span>
            <span className="milestone-text">100 Problems Solved</span>
            <span className="progress">42 / 100 problems</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
