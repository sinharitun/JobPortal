const express = require("express");
const Job = require("../models/Job.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Create Job (Company Only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ message: "Only companies can create jobs" });
  }

  const { title, description, location, salary } = req.body;

  try {
    const job = new Job({ title, description, location, salary, company: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
