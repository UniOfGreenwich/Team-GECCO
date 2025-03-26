import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './contact.scss';

const Contact: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className='contact-container'>
      <button className='back-button' onClick={handleBackClick}>
        ← Back
      </button>
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Please reach out at:</p>
      <ul>
        <li>Email: support@budgetingbuddy.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Finance Way, Suite 100</li>
      </ul>

      <p>
        You can also leave us a message directly on our site. We typically reply
        within 1-2 business days.
      </p>
    </div>
  );
};

export default Contact;
