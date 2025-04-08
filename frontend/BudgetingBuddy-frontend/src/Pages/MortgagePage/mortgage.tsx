import React from "react";
import { useNavigate } from "react-router-dom";
import "./mortgage.scss";

const Mortgage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mortgage-container">
      <h2>Mortgage Plan Page</h2>
      <p>This is a basic placeholder for Mortgage Plan functionality.</p>

      <button onClick={() => navigate("/selection")} className="back-button">
        &larr; Back
      </button>
    </div>
  );
};

export default Mortgage;
