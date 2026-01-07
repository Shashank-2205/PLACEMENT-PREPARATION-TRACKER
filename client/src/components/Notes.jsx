import { useEffect, useState } from "react";
import { getNotes, saveNotes } from "../services/api";

export default function Notes({ userId, topicId }) {
  const [notes, setNotes] = useState("");
  const [resource, setResource] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadNotes() {
      const data = await getNotes(userId, topicId);
      setNotes(data.notes || "");
      setResource(data.resource_link || "");
    }

    if (topicId) {
      loadNotes();
    }
  }, [userId, topicId]);

  const handleSave = async () => {
    await saveNotes({
      user_id: userId,
      topic_id: topicId,
      notes,
      resource_link: resource
    });

    setStatus("Notes saved ✔");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
      <h4>Notes</h4>

      <textarea
        rows="4"
        placeholder="Write your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%" }}
      />

      <input
        type="text"
        placeholder="Resource link (optional)"
        value={resource}
        onChange={(e) => setResource(e.target.value)}
        style={{ width: "100%", marginTop: "5px" }}
      />

      <button onClick={handleSave} style={{ marginTop: "5px" }}>
        Save Notes
      </button>

      {status && <p style={{ color: "green" }}>{status}</p>}
    </div>
  );
}
