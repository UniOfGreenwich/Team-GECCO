import React from 'react';
import { useNavigate } from 'react-router-dom';
import './car.scss';

const Car: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='car-container'>
      <h2>Car Finance Page</h2>
      <p>This is a basic placeholder for Car Finance functionality.</p>

      <button onClick={() => navigate('/selection')} className='back-button'>
        &larr; Back
      </button>
    </div>
  );
};

export default Car;
