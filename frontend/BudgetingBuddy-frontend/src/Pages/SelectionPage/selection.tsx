import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './selection.scss';

interface Option {
  key: string;
  label: string;
  iconClass: string;
  description: string;
}

const Selection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const options: Option[] = [
    {
      key: 'car',
      label: 'Car Finance',
      iconClass: 'fas fa-car',
      description: 'Plan your savings for purchasing a new or used car.',
    },
    {
      key: 'mortgage',
      label: 'Mortgage Plan',
      iconClass: 'fas fa-home',
      description:
        'Calculate savings needed for a house deposit and repayments.',
    },
    {
      key: 'holiday',
      label: 'Holiday',
      iconClass: 'fas fa-plane-departure',
      description: 'Save up for your next vacation or travel adventure.',
    },
    {
      key: 'pension',
      label: 'Pension',
      iconClass: 'fas fa-piggy-bank',
      description: 'Explore strategies for boosting your retirement savings.',
    },
    {
      key: 'custom',
      label: 'Custom Savings',
      iconClass: 'fas fa-sack-dollar',
      description: 'Set up a personalized savings goal for anything else.',
    },
    {
      key: 'wedding',
      label: 'Wedding',
      iconClass: 'fas fa-ring',
      description:
        'Plan and save for the costs associated with your wedding day.',
    },
    {
      key: 'emergency',
      label: 'Emergency Fund',
      iconClass: 'fas fa-shield-alt',
      description: 'Build a safety net for unexpected expenses or income loss.',
    },
    {
      key: 'education',
      label: 'Education Savings',
      iconClass: 'fas fa-user-graduate',
      description: 'Save for tuition, books, or other education-related costs.',
    },
  ];

  const handleSelectOption = (key: string) => {
    setSelectedOption(key);
    setErrorMessage('');
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    key: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelectOption(key);
    }
  };

  const handleContinue = () => {
    if (!selectedOption) {
      setErrorMessage('Please select an option before continuing.');
      return;
    }
    if (selectedOption === 'car') {
      navigate('/car');
    } else if (selectedOption === 'mortgage') {
      navigate('/mortgage');
    } else {
      setErrorMessage(
        `Sorry, the '${
          options.find((o) => o.key === selectedOption)?.label || 'selected'
        }' option is not available yet.`
      );
    }
  };

  return (
    <div className='selection-page'>
      <div className='selection-header'>
        <h2>Choose Your Savings Goal</h2>
      </div>

      <div className='options-grid'>
        {options.map((option) => (
          <div
            key={option.key}
            className={`option-card ${
              selectedOption === option.key ? 'selected' : ''
            }`}
            onClick={() => handleSelectOption(option.key)}
            onKeyPress={(e) => handleKeyPress(e, option.key)}
            role='button'
            tabIndex={0}
          >
            <div className='card-icon'>
              <i className={option.iconClass} aria-hidden='true' />
            </div>
            <div className='card-content'>
              <h3 className='card-title'>{option.label}</h3>
              <p className='card-description'>{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      {errorMessage && (
        <div className='error-message-container'>
          <p className='error-message'>{errorMessage}</p>
        </div>
      )}

      <div className='selection-footer'>
        <button
          className='back-button'
          onClick={() => navigate('/get-started')} // Navigate to /get-started
        >
          Back
        </button>
        <button
          className='continue-button'
          onClick={handleContinue}
          disabled={!selectedOption}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Selection;
