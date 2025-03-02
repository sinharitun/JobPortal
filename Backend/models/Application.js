const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    resume: { type: String, required: true } // URL of uploaded resume (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
