export default function Leaderboard({ data, currentUser }) {
  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const isCurrentUser = (username) => {
    return username.toLowerCase() === currentUser?.toLowerCase();
  };

  return (
    <div className="leaderboard">
      <h2>🏆 Global Leaderboard</h2>

      <div className="leaderboard-header">
        <span className="header-rank">Rank</span>
        <span className="header-username">Username</span>
        <span className="header-stat">Solved</span>
        <span className="header-stat">Streak</span>
        <span className="header-score">Score</span>
      </div>

      <div className="leaderboard-body">
        {data.map((entry) => (
          <div
            key={entry.rank}
            className={`leaderboard-row ${isCurrentUser(entry.username) ? "current-user" : ""} ${
              entry.rank <= 3 ? "top-three" : ""
            }`}
          >
            <div className="rank-cell">
              <span className="medal">{getMedalEmoji(entry.rank)}</span>
            </div>
            <div className="username-cell">
              <div className="username">
                {entry.username}
                {isCurrentUser(entry.username) && <span className="you-badge">YOU</span>}
              </div>
            </div>
            <div className="stat-cell">
              <span className="stat-value">{entry.solved}</span>
              <span className="stat-label">problems</span>
            </div>
            <div className="stat-cell">
              <span className="stat-value">{entry.streak}</span>
              <span className="stat-label">days</span>
            </div>
            <div className="score-cell">
              <span className="score">{entry.score}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-footer">
        <p>🎯 Rankings update daily based on problem solving and streaks</p>
      </div>
    </div>
  );
}
