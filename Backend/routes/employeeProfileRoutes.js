const express = require("express");
const router = express.Router();
const EmployeeProfile = require("../models/EmployeeProfile");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 **Fetch Employee Profile**
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await EmployeeProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Employee profile not found." });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee profile." });
  }
});

// 📌 **Create or Update Employee Profile**
router.post("/update", authMiddleware, async (req, res) => {
  const { education, workExperience, address, resume } = req.body;

  try {
    let profile = await EmployeeProfile.findOne({ user: req.user.id });

    if (!profile) {
      // If no profile exists, create a new one
      profile = new EmployeeProfile({
        user: req.user.id,
        education,
        workExperience,
        address,
        resume,
      });
    } else {
      // If profile exists, update it
      profile.education = education;
      profile.workExperience = workExperience;
      profile.address = address;
      profile.resume = resume;
    }

    await profile.save();
    res.json({ message: "Profile updated successfully!", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile." });
  }
});

module.exports = router;
