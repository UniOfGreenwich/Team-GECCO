import { useNavigate } from 'react-router-dom';
import './welcome.scss';
import logo from '../../assets/budgetingBuddyLogo.png';

const WelcomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-title-container">
        <h1>Welcome to BudgetingBuddy</h1>
        <img src={logo} alt="BudgetingBuddy Logo" className="logo" />
        </div>
        
        <div className="button-container">
          <button onClick={() => navigate('/dashboard')}>
            Load Previous Dashboard
          </button>
          
          <div className="divider">or</div>
          
          <button 
            className="secondary-button"
            onClick={() => navigate('/get-started')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;

