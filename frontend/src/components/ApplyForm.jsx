import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles.css";

const ApplyForm = () => {
  const { jobId } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    marks10th: "",
    marks12th: "",
    graduationMarks: "",
    workExperience: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form successfully submitted!");
    navigate("/dashboard"); // Redirect to Dashboard after submission
  };

  return (
    <div className="apply-form-container">
      <h2>Apply for Job</h2>
      <div className="form-input">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="marks10th" placeholder="10th Marks (%)" value={formData.marks10th} onChange={handleChange} required />
        <input type="number" name="marks12th" placeholder="12th Marks (%)" value={formData.marks12th} onChange={handleChange} required />
        <input type="number" name="graduationMarks" placeholder="Graduation Marks (%)" value={formData.graduationMarks} onChange={handleChange} required />
        <input type="text" name="workExperience" placeholder="Work Experience (in years)" value={formData.workExperience} onChange={handleChange} />

        <div className="apply-buttons">
          <button type="submit" className="apply-submit-btn">Apply</button>
          <button type="button" className="apply-close-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ApplyForm;
