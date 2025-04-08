import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Help.scss";

const Help: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="help-container">
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>
      <h2>Help & FAQs</h2>

      <h3>How do I create a new budget?</h3>
      <p>
        In your dashboard, click the "Create Budget" button and follow the
        on-screen prompts to set up your categories, incomes, and expenses.
      </p>

      <h3>Can I import my financial data?</h3>
      <p>
        Yes! Our app supports importing CSV files with your transactions. Go to
        Settings &gt; Import Data.
      </p>

      <h3>Where can I learn more tips?</h3>
      <p>
        Check out our blog for budgeting tips, success stories, and community
        discussions on how to make the most of BudgetingBuddy.
      </p>
    </div>
  );
};

export default Help;
