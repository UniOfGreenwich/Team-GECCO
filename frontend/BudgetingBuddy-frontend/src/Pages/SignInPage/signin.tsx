import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.scss';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (username === 'admin123' && password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='signin-page-container'>
      <div className='signin-card'>
        <button className='back-button' onClick={() => navigate('/')}>
          ← Back
        </button>

        <h2 className='signin-title'>Budgeting Buddy Sign In</h2>

        <p className='signin-note'>
          Note: Use <strong>admin123</strong> as the Username and Password as
          this functionality is not fully implemented.
        </p>

        <form onSubmit={handleSubmit} className='signin-form' noValidate>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              placeholder='e.g., admin123'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required='true'
              aria-invalid={!!error}
              aria-describedby={error ? 'signin-error' : undefined}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required='true'
              aria-invalid={!!error}
              aria-describedby={error ? 'signin-error' : undefined}
            />
          </div>

          {error && (
            <p id='signin-error' className='error-message' role='alert'>
              {error}
            </p>
          )}

          <button type='submit' className='signin-button'>
            Sign In
          </button>

          <div className='signin-links'>
            <Link to='/get-started' className='signup-link-button'>
              Don't have an account? Sign Up!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
