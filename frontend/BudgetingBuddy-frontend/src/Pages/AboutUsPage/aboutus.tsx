import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AboutUs.scss";

const AboutUs: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="about-us-container">
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>
      <h2>About Us</h2>
      <p>
        Welcome to BudgetingBuddy! We’re a small team of passionate developers
        and financial enthusiasts dedicated to helping individuals and families
        effortlessly manage their finances.
      </p>
      <p>
        Our mission is to make budgeting simple, accessible, and even enjoyable.
        We believe everyone should have the tools to gain financial clarity and
        achieve their goals.
      </p>
    </div>
  );
};

export default AboutUs;
