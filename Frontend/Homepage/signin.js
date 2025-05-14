import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignIn = ({ handleSignIn }) => {
  const navigate = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    handleSignIn();
    navigate('/home');
  };

  return (
    <div className="auth-container">


      <h1 className="welcome-heading">Welcome To Bank Statement Analyzer</h1>

      <h2 className="bank-statement-title">
        Your bank statement: the epic saga of your cash and its great escape! Expect a "food delivery" chapter (we've all been there).
      </h2>

      <p className="bank-statement-description">
        Then, the "online shopping" spree – your personal joy delivery service.
      </p>
      <p className="bank-statement-description">
        And ah, the sneaky "subscriptions" quietly doing their thing.
      </p>
      <p className="bank-statement-description">
        But wait, the "salary" hero arrives! It's a funny, honest, and oh-so-relatable story of your money's journey.
      </p>

      <form className="auth-box" onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <div className="auth-actions">
          <button type="submit">Sign In</button>
          <div className="secondary-actions">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="link-button forgot-password"
            >
              Forgot Password?
            </button>
            <button type="button" className="google-signin-button">
              Sign in with Google
            </button>
          </div>
        </div>

        <p>
          New user?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="link-button"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;