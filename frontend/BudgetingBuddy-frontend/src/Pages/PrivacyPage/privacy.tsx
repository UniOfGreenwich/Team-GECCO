import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Privacy.scss';

const Privacy: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className='privacy-container'>
      <button className='back-button' onClick={handleBackClick}>
        ← Back
      </button>
      <h2>Privacy Policy</h2>
      <p>
        At BudgetingBuddy, we value your privacy. All data you provide is
        securely stored and never sold to third parties. Our app adheres to the
        highest standards of encryption and data protection.
      </p>

      <p>
        <strong>Information We Collect:</strong> Your name, email, and financial
        details that you manually enter or upload.
      </p>

      <p>
        <strong>How We Use It:</strong> We use your information solely to
        provide budgeting insights, help you track expenses, and generate
        reports.
      </p>

      <p>
        For more details on data retention and user rights, please refer to the
        full privacy policy document or contact us at
        privacy@budgetingbuddy.com.
      </p>
    </div>
  );
};

export default Privacy;
