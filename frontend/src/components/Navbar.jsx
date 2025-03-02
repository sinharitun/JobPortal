import { Link } from "react-router-dom";
import { useState } from "react"; // ✅ Import useState
import "../styles.css";

const Navbar = () => {
  const [showAbout, setShowAbout] = useState(false); // ✅ Define state

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/dashboard" className="logo">Job Board</Link>
        <div className="nav-links">
          {/* About Section Trigger */}
          <span className="nav-item" onClick={() => setShowAbout(!showAbout)}>
            About
          </span>
          
          <Link to="/profile">Profile</Link>
          <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/" }} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* About Section (Sliding from Top) */}
      <div className={`about-section ${showAbout ? "show" : ""}`}>
        <button className="close-btn" onClick={() => setShowAbout(false)}>✖</button>
        <div className="about-content">
          <div className="about-left">
            <img src="/your-photo.jpg" alt="Developer - Ritun Raj" className="developer-photo" />
          </div>
          <div className="about-right">
            <h2>About the Developer</h2>
            <p><strong>Name:</strong> Ritun Raj</p>
            <p><strong>Email:</strong> ritunraj230301@example.com</p>
            <p><strong>GitHub:</strong> <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">https://github.com/sinharitun</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/ritun-raj-316560254/</a></p>
            <br /><br />
            <h3>About This Project</h3>
            <p>This Job Board project allows users to register as an Employee or Company, apply for jobs, and manage job listings. Built using the **MERN Stack**, it features user authentication, job filtering, and an interactive UI.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
