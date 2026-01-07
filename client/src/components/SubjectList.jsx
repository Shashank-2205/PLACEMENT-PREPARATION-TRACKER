export default function SubjectList({ topics, setSelectedSubject }) {
  if (!topics || topics.length === 0) return null;

  const subjects = [...new Set(topics.map(t => t.subject).filter(Boolean))];

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setSelectedSubject(null)}>All</button>

      {subjects.map(sub => (
        <button
          key={sub}
          style={{ marginLeft: "10px" }}
          onClick={() => setSelectedSubject(sub)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}
