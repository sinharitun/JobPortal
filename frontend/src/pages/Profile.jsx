// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles.css";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [companyDescription, setCompanyDescription] = useState("");
//   const [editDescription, setEditDescription] = useState(false);
//   const [education, setEducation] = useState("");
//   const [resume, setResume] = useState("");
//   const [address, setAddress] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobLocation, setJobLocation] = useState("");
//   const [jobSalary, setJobSalary] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/auth/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         // console.log("API Response:", res.data);
//         setUser(res.data);
//         setCompanyDescription(res.data.description || "");
//         setEducation(res.data.education || "");
//         setResume(res.data.resume || "");
//         setAddress(res.data.address || "");
//       })
//       .catch(() => navigate("/"));
//   }, [navigate]);

//   // Handle Profile Info Update
//   const handleProfileUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:5000/api/auth/update-profile",
//         {
//           description: companyDescription,
//           education,
//           resume,
//           address,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Profile update failed", error.response.data);
//     }
//   };

//   // Handle Job Creation (Company Only)
//   const handleCreateJob = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/jobs",
//         {
//           title: jobTitle,
//           description: jobDesc,
//           location: jobLocation,
//           salary: jobSalary,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Job posted successfully!");
//       setJobTitle("");
//       setJobDesc("");
//       setJobLocation("");
//       setJobSalary("");
//     } catch (error) {
//       console.error("Job creation failed", error.response.data);
//     }
//   };

//   return (
//     <div className="profile-container">
//       {user ? (
//         <>
//           <div className="profile-header">
//             {/* Profile Info Section */}
//             <div className="profile-right">
//               <h2>{user.name || user.companyName}</h2>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p>
//                 <strong>Role:</strong> {user.role}
//               </p>

//               {user.role === "company" && (
//                 <>
//                   <h3>Company Description</h3>
//                   {!editDescription ? (
//                     <p>{companyDescription}</p>
//                   ) : (
//                     <textarea
//                       value={companyDescription}
//                       onChange={(e) => setCompanyDescription(e.target.value)}
//                     />
//                   )}
//                   <button
//                     className="edit-button"
//                     onClick={() => setEditDescription(!editDescription)}
//                   >
//                     ✏️
//                   </button>
//                   {editDescription && (
//                     <button className="save-button" onClick={handleProfileUpdate}>
//                       Save
//                     </button>
//                   )}
//                 </>
//               )}

//               {user.role === "employee" && (
//                 <>
//                   <h3>Education:</h3>
//                   <input
//                     type="text"
//                     value={education}
//                     onChange={(e) => setEducation(e.target.value)}
//                   />

//                   <h3>Resume:</h3>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={(e) => setResume(e.target.files[0])}
//                   />

//                   <h3>Address:</h3>
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />

//                   <button onClick={handleProfileUpdate}>Save Profile</button>
//                 </>
//               )}
//             </div>
//           </div>

//           <hr className="profile-divider" />

//           {user.role === "company" && (
//             <>
//               <h3>Post a New Job</h3>
//               <form onSubmit={handleCreateJob}>
//                 <input
//                   type="text"
//                   placeholder="Job Title"
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   required
//                 />
//                 <textarea
//                   placeholder="Job Description"
//                   value={jobDesc}
//                   onChange={(e) => setJobDesc(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   value={jobLocation}
//                   onChange={(e) => setJobLocation(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Salary"
//                   value={jobSalary}
//                   onChange={(e) => setJobSalary(e.target.value)}
//                   required
//                 />
//                 <button type="submit">Post Job</button>
//               </form>
//             </>
//           )}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [resume, setResume] = useState("");
  const [address, setAddress] = useState("");
  const [showJobForm, setShowJobForm] = useState(false); // Toggle for job form
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

    // Fetch User Info
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data))
    .catch(() => navigate("/"));

    // Fetch Employee Profile Info
    if (user?.role === "employee") {
      axios.get("http://localhost:5000/api/employee-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEducation(res.data.education || "");
        setWorkExperience(res.data.workExperience || "");
        setResume(res.data.resume || "");
        setAddress(res.data.address || "");
      })
      .catch((err) => console.error("Employee Profile Fetch Error:", err));
    }
  }, [navigate]);

  // Handle Profile Update
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/employee-profile/update", {
        education,
        workExperience,
        address,
        resume,
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Profile updated successfully!");
      setEditMode(false);
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
        title: jobTitle,
        description: jobDesc,
        location: jobLocation,
        salary: jobSalary,
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Job posted successfully!");
      setShowJobForm(false); // Hide form after submission
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
            <h2>Employee Profile</h2>
            <button onClick={() => setEditMode(!editMode)} className="edit-button">
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <hr className="profile-divider" />

            {/* Employee Profile Section */}
            {user.role === "employee" && (
              <>
                <div className="profile-section">
                  <h3>Education</h3>
                  {editMode ? (
                    <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
                  ) : (
                    <p>{education || "Not provided"}</p>
                  )}
                </div>

                <div className="profile-section">
                  <h3>Work Experience</h3>
                  {editMode ? (
                    <input type="text" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />
                  ) : (
                    <p>{workExperience || "Not provided"}</p>
                  )}
                </div>

                <div className="profile-section">
                  <h3>Address</h3>
                  {editMode ? (
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                  ) : (
                    <p>{address || "Not provided"}</p>
                  )}
                </div>

                {editMode && (
                  <button className="save-button" onClick={handleProfileUpdate}>Save Changes</button>
                )}
              </>
            )}

            {/* Company Profile Section */}
            {user.role === "company" && (
              <>
                <button className="create-job-btn" onClick={() => setShowJobForm(!showJobForm)}>
                  {showJobForm ? "Cancel Job Post" : "Create New Job"}
                </button>

                {showJobForm && (
                  <div className="job-form">
                    <h3>Create a New Job</h3>
                    <form onSubmit={handleCreateJob}>
                      <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                      <textarea placeholder="Job Description" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} required />
                      <input type="text" placeholder="Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required />
                      <input type="number" placeholder="Salary" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} required />
                      <button type="submit">Post Job</button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
