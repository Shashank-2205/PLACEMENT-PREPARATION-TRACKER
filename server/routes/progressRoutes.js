const express = require("express");
const router = express.Router();
const db = require("../config/db");
// const authenticateToken = require("./authRoutes").authenticateToken;

// router.use(authenticateToken);

// ✅ GET topics WITH progress (even if not completed)
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT 
      t.id,
      t.title,
      s.name AS subject,
      IFNULL(p.completed, 0) AS completed
    FROM topics t
    JOIN subjects s ON t.subject_id = s.id
    LEFT JOIN progress p 
      ON t.id = p.topic_id AND p.user_id = ?
    ORDER BY s.name, t.title
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// ✅ UPDATE progress (insert OR update)
router.put("/", (req, res) => {
  const { user_id, topic_id, completed } = req.body;

  const sql = `
    INSERT INTO progress (user_id, topic_id, completed)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE completed = ?
  `;

  db.query(
    sql,
    [user_id, topic_id, completed, completed],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Progress updated" });
    }
  );
});

module.exports = router;
