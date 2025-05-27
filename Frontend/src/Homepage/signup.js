import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Call backend to send OTP to email
  const handleEmailVerify = async () => {
    if (!email) {
      alert('Please enter your email first.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error('Failed to send OTP');
      }
      const data = await res.json();
      if (data.success) {
        alert(`OTP sent to ${email}`);
        setStep(2);
      } else {
        alert(data.message || 'Error sending OTP');
      }
    } catch (err) {
      alert('Error sending OTP: ' + err.message);
    }
  };

  // Verify OTP by calling backend
  const handleOtpVerify = async () => {
    if (otp.trim() === '') {
      alert('Please enter the OTP.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        alert('OTP verified successfully!');
        setStep(3);
      } else {
        alert(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      alert('Error verifying OTP: ' + err.message);
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Here you can add your backend call to create the user
    // For now, just alert success and navigate
    alert('Signup successful!');
    navigate('/');  // Redirect to home page or wherever you want
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome To Bank Statement Analyzer</h1>
      <h2 style={styles.subHeading}>Sign Up</h2>
      <form style={styles.form} onSubmit={onSubmit}>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="button" onClick={handleEmailVerify} style={styles.button}>
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={styles.input}
            />
            <button type="button" onClick={handleOtpVerify} style={styles.button}>
              Verify OTP
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => navigate('/signin')}
          style={styles.linkButton}
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2C3E50',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 1rem',
    boxSizing: 'border-box',
    color: 'white',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    width: 520,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 15,
    padding: '2rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #aaa',
    color: 'black',
  },
  button: {
    width: '50%',
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: 14,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: 10,
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 14,
    marginTop: 15,
    padding: 0,
  },
};

export default SignUp;
