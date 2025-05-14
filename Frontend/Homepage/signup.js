import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignUp = ({ handleSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = () => {
    setIsVerified(true);
    alert('Verification successful! Please fill in the other details.');
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    handleSignUp();
    navigate('/home');
  };

  return (
    <div className="auth-container">

      <h1 className="welcome-heading">Welcome To Bank Statement Analyzer</h1>

      <h2 className="subtitle-heading">
        Our bank statement: the epic saga of your cash and its great escape!
      </h2>

      <p className="bank-statement-description">
        Expect a "food delivery" chapter (we've all been there).
      </p>
      <p className="bank-statement-description">
        Then, the "online shopping" spree – your personal joy delivery service.
      </p>
      <p className="bank-statement-description">
        And ah, the sneaky "subscriptions" quietly doing their thing. But wait, the "salary" hero arrives! It's a funny, honest, and oh-so-relatable story of your money's journey.
      </p>

      <form className="auth-box" onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        {!isVerified ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            <button type="button" onClick={handleVerify}>
              Verify
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </>
        )}

        <p>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="link-button"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;