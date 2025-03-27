import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.scss';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple credential check: "admin123" / "admin123"
    if (username === 'admin123' && password === 'admin123') {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // Show an error message
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='signin-container'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className='error-message'>{error}</p>}

        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
