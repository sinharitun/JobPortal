import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    jobType: "",
    salaryRange: "",
  });
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      
      

      <div className="dashboard-content">
        
        {/* Sidebar - Search & Filters */}
        <div className="sidebar">
          <div className="search">
          <input 
            type="text" 
            placeholder="Search Jobs..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          </div>
          
          <div className="filters">
            <h3>Filter Jobs</h3>
            <select onChange={(e) => setFilter({ ...filter, jobType: e.target.value })}>
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Work from Home</option>
            </select>

            <select onChange={(e) => setFilter({ ...filter, salaryRange: e.target.value })}>
              <option value="">Salary Range</option>
              <option value="0-50000">0-50,000</option>
              <option value="50000-100000">50,000-100,000</option>
              <option value="100000+">100,000+</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="job-listings">
        {jobs
          .filter(job => 
            job.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter.jobType ? job.jobType === filter.jobType : true) &&
            (filter.salaryRange ? job.salary === filter.salaryRange : true)
          )
          .map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company.name}</p>
              <p><strong>Location:</strong> {job.location ? job.location : "Not specified"}</p> {/* ✅ Added location */}
              <p><strong>Salary:</strong> {job.salary}</p>
              <p>{job.description}</p>
              <button className="apply-btn" onClick={() => navigate(`/apply/${job._id}`)}>Apply Now</button>
            </div>
        ))}
      </div>

      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Ritun Raj. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Dashboard;
