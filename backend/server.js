const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");
const profileRoutes = require("./routes/profile");
const applicationsRoutes = require("./routes/applications");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationsRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "CareerAI Backend is Running 🚀"
    });
});

app.get("/test", (req, res) => {
    res.send("Server bilkul sahi chal raha hai!");
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 CareerAI Backend running on http://localhost:${PORT}`);
});