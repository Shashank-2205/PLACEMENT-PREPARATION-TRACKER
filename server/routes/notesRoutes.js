const express = require("express");
const router = express.Router();
const db = require("../config/db");
// const authenticateToken = require("./authRoutes").authenticateToken;

// router.use(authenticateToken);

/*
  GET NOTES FOR A USER + TOPIC
  URL: /api/notes/:userId/:topicId
*/
router.get("/:userId/:topicId", (req, res) => {
  const { userId, topicId } = req.params;

  const sql = `
    SELECT notes, resource_link
    FROM notes
    WHERE user_id = ? AND topic_id = ?
  `;

  db.query(sql, [userId, topicId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // If no notes exist yet, return empty values
    if (results.length === 0) {
      return res.json({
        notes: "",
        resource_link: ""
      });
    }

    res.json(results[0]);
  });
});

/*
  SAVE OR UPDATE NOTES
  URL: /api/notes
*/
router.post("/", (req, res) => {
  const { user_id, topic_id, notes, resource_link } = req.body;

  const sql = `
    INSERT INTO notes (user_id, topic_id, notes, resource_link)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      notes = VALUES(notes),
      resource_link = VALUES(resource_link)
  `;

  db.query(
    sql,
    [user_id, topic_id, notes, resource_link],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Notes saved successfully" });
    }
  );
});

module.exports = router;
