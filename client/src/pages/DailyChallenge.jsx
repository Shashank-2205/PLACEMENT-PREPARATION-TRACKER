import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DailyProblem from "../components/DailyProblem";
import StreakCounter from "../components/StreakCounter";
import Leaderboard from "../components/Leaderboard";
import Achievements from "../components/Achievements";

export default function DailyChallenge({ user, onLogout }) {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    currentStreak: 5,
    longestStreak: 12,
    problemsSolved: 42,
    totalAttempts: 68,
    lastCompletedDate: new Date().toISOString(),
    achievements: [
      { id: 1, name: "First Step", description: "Solve your first daily challenge", unlocked: true, date: "2025-12-01" },
      { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", unlocked: true, date: "2025-12-15" },
      { id: 3, name: "Month Master", description: "Maintain a 30-day streak", unlocked: false, date: null },
      { id: 4, name: "Century", description: "Solve 100 problems", unlocked: false, date: null },
    ],
  });

  const [dailyProblem] = useState({
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    acceptanceRate: 47.3,
    submissions: 15234,
    solutions: 2341,
  });

  const [leaderboardData] = useState([
    { rank: 1, username: "CodeMaster", solved: 156, streak: 45, score: 4850 },
    { rank: 2, username: "AlgorithmPro", solved: 142, streak: 38, score: 4620 },
    { rank: 3, username: "DataNinja", solved: 138, streak: 35, score: 4450 },
    { rank: 4, username: user?.name || "You", solved: userStats.problemsSolved, streak: userStats.currentStreak, score: 1950 },
    { rank: 5, username: "ByteHunter", solved: 95, streak: 18, score: 2150 },
    { rank: 6, username: "StackOverflow", solved: 87, streak: 14, score: 1820 },
    { rank: 7, username: "QueryMaster", solved: 76, streak: 9, score: 1450 },
    { rank: 8, username: "CacheKing", solved: 65, streak: 7, score: 1120 },
  ]);

  const handleSolveChallenge = (code, language) => {
    // Simulate solving challenge
    alert(`Submitted ${language} solution!\nGreat job!`);
  };

  const handleSkipChallenge = () => {
    if (confirm("Skip today's challenge? Your streak will be reset.")) {
      setUserStats((prev) => ({
        ...prev,
        currentStreak: 0,
      }));
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="daily-challenge-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>🎯 Daily Challenge System</h1>

        <div className="challenge-grid">
          {/* Left Section - Problem and Streak */}
          <div className="challenge-main">
            <StreakCounter stats={userStats} />
            <DailyProblem 
              problem={dailyProblem}
              onSolve={handleSolveChallenge}
              onSkip={handleSkipChallenge}
            />
          </div>

          {/* Right Section - Leaderboard and Achievements */}
          <div className="challenge-sidebar">
            <Leaderboard data={leaderboardData} currentUser={user?.name} />
            <Achievements achievements={userStats.achievements} />
          </div>
        </div>
      </div>
    </>
  );
}
