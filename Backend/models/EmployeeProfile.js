const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  education: { type: String, default: "" },
  workExperience: { type: String, default: "" },
  address: { type: String, default: "" },
  resume: { type: String, default: "" },
});

module.exports = mongoose.model("EmployeeProfile", EmployeeProfileSchema);
