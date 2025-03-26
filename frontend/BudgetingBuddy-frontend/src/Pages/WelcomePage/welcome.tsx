import { useNavigate, Link } from 'react-router-dom'; // Add Link here
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
        <h1>Welcome to BudgetingBuddy</h1>
        <p>Manage your finances with ease</p>

        <div className='button-group'>
          <button onClick={() => navigate('/get-started')}>
            Start Your New Journey
          </button>
          <button onClick={() => navigate('/dashboard')}>
            Sign In To View Existing
          </button>
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
