const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");
const notesRoutes = require("./routes/notesRoutes");
const codingProfileRoutes = require("./routes/codingProfileRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5175",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/coding-profile", codingProfileRoutes);

app.get("/", (req, res) => {
  res.send("Placement Prep Tracker API is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
