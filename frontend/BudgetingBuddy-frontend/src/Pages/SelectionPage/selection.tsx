import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './selection.scss';

interface Option {
  key: string;
  label: string;
  iconClass: string; // For an icon class or a path to an icon image
}

const Selection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  // List of options with placeholder icon classes (e.g., Font Awesome).
  // You can use images or React icons instead.
  const options: Option[] = [
    { key: 'car', label: 'Car Finance', iconClass: 'fa fa-car' },
    { key: 'mortgage', label: 'Mortgage Plan', iconClass: 'fa fa-home' },
    { key: 'holiday', label: 'Holiday', iconClass: 'fa fa-plane' },
    { key: 'pension', label: 'Pension', iconClass: 'fa fa-money' },
    { key: 'custom', label: 'Custom Savings', iconClass: 'fa fa-piggy-bank' },
    { key: 'wedding', label: 'Wedding', iconClass: 'fa fa-heart' },
  ];

  const handleSelectOption = (key: string) => {
    setSelectedOption(key);
    setErrorMessage('');
  };

  const handleContinue = () => {
    if (selectedOption === 'car') {
      navigate('/car');
    } else if (selectedOption === 'mortgage') {
      navigate('/mortgage');
    } else {
      setErrorMessage('Functionality is unavailable for this option.');
    }
  };

  return (
    <div className='selection-container'>
      <div className='selection-header'>
        {/* BACK button -> go to welcome page */}
        <h2>Please select your finance help plan</h2>
      </div>

      {/* Options list */}
      <div className='options-list'>
        {options.map((option) => (
          <div
            key={option.key}
            className={`option-item ${
              selectedOption === option.key ? 'selected' : ''
            }`}
            onClick={() => handleSelectOption(option.key)}
          >
            <i className={option.iconClass} aria-hidden='true' />
            <span>{option.label}</span>
          </div>
        ))}
      </div>

      {/* Error message if user picks a non-implemented option and hits continue */}
      {errorMessage && <div className='error-message'>{errorMessage}</div>}

      {/* Continue / back buttons */}
      <div className='selection-footer'>
        <button className='back-button' onClick={() => navigate('/')}>
          Back
        </button>
        <button className='continue-button' onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Selection;
