export default function ProgressBar({ topics }) {
  const completed = topics.filter(t => t.completed).length;
  const total = topics.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Progress: {percent}%</h3>

      <div style={{
        width: "100%",
        height: "20px",
        background: "#ddd",
        borderRadius: "10px"
      }}>
        <div style={{
          width: `${percent}%`,
          height: "100%",
          background: "#4caf50",
          borderRadius: "10px"
        }} />
      </div>

      <p>{completed} / {total} topics completed</p>
    </div>
  );
}
