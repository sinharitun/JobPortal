const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply for a job
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Check if already applied
    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      resume: req.body.resume // Assuming the resume is uploaded elsewhere and its URL is provided
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get applications for a company
router.get("/company", authMiddleware, async (req, res) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const applications = await Application.find()
      .populate("job", "title")
      .populate("user", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
