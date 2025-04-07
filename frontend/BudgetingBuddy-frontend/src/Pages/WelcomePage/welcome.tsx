import { useNavigate, Link } from 'react-router-dom';
import './welcome.scss';
import logo from '../../assets/budgetingBuddyLogo.png';

const WelcomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className='welcome-page'>
      {/* Header with the logo */}
      <header className='welcome-header'>
        <img src={logo} alt='BudgetingBuddy Logo' className='header-logo' />
      </header>

      {/* Main content: Title, subtitle, and buttons */}
      <main className='welcome-main'>
        <div className='welcome-content-card'>
          <h1>Welcome to BudgetingBuddy</h1>
          <p>Manage your finances with ease</p>

          <div className='button-group'>
            {/* Use button-primary for the first button */}
            <button
              className='button-primary' // <-- Keep this class
              onClick={() => navigate('/get-started')}
            >
              Start Your New Journey
            </button>
            {/* Use button-primary for the second button as well */}
            <button
              className='button-primary' // <-- CHANGE this class to primary
              onClick={() => navigate('/signin')}
            >
              Sign In To View Existing
            </button>
          </div>
        </div>
      </main>

      {/* Footer with links */}
      <footer className='welcome-footer'>
        <ul>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
          <li>
            <Link to='/help'>Help</Link>
          </li>
          <li>
            <Link to='/privacy'>Privacy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default WelcomeComponent;
