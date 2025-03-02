const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const mongoose = require("mongoose");
const applicationRoutes = require("./routes/applicationRoutes");

const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
// Test API
app.get("/", (req, res) => {
  res.send("Job Board API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
