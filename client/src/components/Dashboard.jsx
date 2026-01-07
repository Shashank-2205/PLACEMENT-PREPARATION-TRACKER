import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, updateProgress } from "../services/api";
import Notes from "./Notes";
import ProgressChart from "./ProgressChart";
import Navbar from "../components/Navbar";


export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search & Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await getTopics(user.id);
        if (Array.isArray(data)) {
          // normalize completed to boolean
          setTopics(
            data.map((t) => ({ ...t, completed: Boolean(t.completed) }))
          );
        } else {
          setTopics([]);
        }
      } catch (err) {
        console.error("Error loading topics", err);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [user.id]);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  // 📊 ANALYTICS LOGIC
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.completed).length;
  const pendingTopics = totalTopics - completedTopics;

  const progressPercent =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  // 🔍 FILTER LOGIC
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && topic.completed) ||
      (statusFilter === "pending" && !topic.completed);

    const matchesSubject =
      subjectFilter === "all" || topic.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  return (
    <>
      {/* 🔝 NAVBAR */}
      <Navbar user={user} onLogout={onLogout} />

      {/* 📦 DASHBOARD CONTENT */}
      <div className="container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h2>Welcome, {user.name}</h2>

        {/* 📊 SUMMARY */}
        <div className="stats">
          <div className="card stat-card">
            <h4>Total</h4>
            <p>{totalTopics}</p>
          </div>

          <div className="card stat-card">
            <h4>Completed</h4>
            <p>{completedTopics}</p>
          </div>

          <div className="card stat-card">
            <h4>Pending</h4>
            <p>{pendingTopics}</p>
          </div>

          <div className="card stat-card">
            <h4>Progress</h4>
            <p>{progressPercent}%</p>
          </div>
        </div>

        {/* 📈 PROGRESS BAR */}
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p>{progressPercent}% completed</p>
        </div>

        {/* 🥧 PIE CHART */}
        <div className="card" style={{ width: "320px", marginBottom: "20px" }}>
          <ProgressChart
            completed={completedTopics}
            pending={pendingTopics}
          />
        </div>

        <h3>Topics</h3>

        {/* 🔍 FILTERS */}
        <div className="filters">
          <input
            placeholder="Search topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {[...new Set(topics.map(t => t.subject))].map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* 📚 TOPICS */}
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="card topic">
            <label>
              <input
                type="checkbox"
                checked={topic.completed}
                onChange={async () => {
                  // optimistic update
                  setTopics((prev) =>
                    prev.map((t) =>
                      t.id === topic.id ? { ...t, completed: !t.completed } : t
                    )
                  );

                  try {
                    await updateProgress({
                      user_id: user.id,
                      topic_id: topic.id,
                      completed: !topic.completed
                    });
                  } catch (err) {
                    console.error("Failed to update progress", err);
                    // revert on error
                    setTopics((prev) =>
                      prev.map((t) =>
                        t.id === topic.id ? { ...t, completed: topic.completed } : t
                      )
                    );
                    alert("Could not update progress. Try again.");
                  }
                }}
              />{" "}
              {topic.subject} - {topic.title}
            </label>

            <Notes userId={user.id} topicId={topic.id} />
          </div>
        ))}
      </div>
    </>
  );
}
