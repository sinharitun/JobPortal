import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [education, setEducation] = useState("");
  const [resume, setResume] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUser(res.data);
      setProfileImage(res.data.profileImage || "https://via.placeholder.com/100");
      setCompanyDescription(res.data.description || "");
      setEducation(res.data.education || "");
      setResume(res.data.resume || "");
      setAddress(res.data.address || "");
    })
    .catch(() => navigate("/"));
  }, [navigate]);

  // Handle Profile Picture Update
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/auth/upload-profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setProfileImage(res.data.profileImage);
    } catch (error) {
      console.error("Profile image update failed", error.response.data);
    }
  };

  // Handle Profile Info Update
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/update-profile", {
        description: companyDescription,
        education,
        resume,
        address,
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error.response.data);
    }
  };

  // Handle Job Creation (Company Only)
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/jobs", {
        title: jobTitle, description: jobDesc, location: jobLocation, salary: jobSalary
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Job posted successfully!");
      setJobTitle("");
      setJobDesc("");
      setJobLocation("");
      setJobSalary("");
    } catch (error) {
      console.error("Job creation failed", error.response.data);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-header">
            <div className="profile-left">
              <img src={profileImage} alt="Profile" className="profile-image" />
              <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            </div>

            <div className="profile-right">
              <h2>{user.name || user.companyName}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>

              {user.role === "company" ? (
                <>
                  <h3>Edit Company Description</h3>
                  <textarea value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} />
                </>
              ) : (
                <>
                  <h3>Edit Personal Info</h3>
                  <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} />
                  <input type="text" placeholder="Resume Link" value={resume} onChange={(e) => setResume(e.target.value)} />
                  <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </>
              )}
              <button className="button" onClick={handleProfileUpdate}>Save Changes</button>
            </div>
          </div>

          <hr className="profile-divider" />

          {user.role === "company" ? (
            <>
              <h3>Create a New Job Post</h3>
              <form onSubmit={handleCreateJob} className="job-form">
                <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                <textarea placeholder="Job Description" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} required />
                <input type="text" placeholder="Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required />
                <input type="number" placeholder="Salary" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} required />
                <button type="submit" className="button">Post Job</button>
              </form>
            </>
          ) : (
            <h3>Your Information is Up to Date</h3>
          )}
        </>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
