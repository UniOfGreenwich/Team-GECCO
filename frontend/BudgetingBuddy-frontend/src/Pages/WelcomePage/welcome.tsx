import { useNavigate, Link } from "react-router-dom";
import "./welcome.scss";
import logo from "../../assets/budgetingBuddyLogo.png";

const WelcomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <img src={logo} alt="BudgetingBuddy Logo" className="header-logo" />
      </header>

      <main className="welcome-main">
        <div className="welcome-content-card">
          <h1>Welcome to BudgetingBuddy</h1>
          <p>Manage your finances with ease</p>

          <div className="button-group">
            <button
              className="button-primary"
              onClick={() => navigate("/get-started")}
            >
              Start Your New Journey
            </button>
            <button
              className="button-primary"
              onClick={() => navigate("/signin")}
            >
              Sign In To View Existing
            </button>
            {/* --- Add New Button Here --- */}
            <button
              className="button-secondary"
              onClick={() => navigate("/Financial-quiz")}
            >
              Test Your Financial Knowledge
            </button>
          </div>
        </div>
      </main>

      <footer className="welcome-footer">
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default WelcomeComponent;
