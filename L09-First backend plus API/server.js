const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Task 1 & 2 — Updated message endpoint with extra fields
app.get("/api/message", (req, res) => {
  res.json({
    message: "My first API works!",
    course: "Browser Programming",
    year: 2026,
    time: new Date()
  });
});

// Task 3 — New student endpoint
app.get("/api/student", (req, res) => {
  res.json({
    name: "Your Name",
    role: "Student"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
