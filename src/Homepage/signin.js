import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  formHeading: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
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
    width: '70%',
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: 14,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: 10,
  },
  actionsRow: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 14,
    padding: 0,
  },
  googleButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    padding: 10,
    width: '48%',
  },
  forgotButton: {
    backgroundColor: '#007bff',
    border: '1px solid #ccc',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    fontSize: 14,
    padding: 10,
    width: '48%',
  },
  newUserText: {
    marginTop: 15,
    fontSize: 14,
  },
};

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login delay and redirect
    setTimeout(() => {
      alert('Logged in successfully (dummy)');
      navigate('/home');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome To Bank Statement Analyzer</h1>
      <form style={styles.form} onSubmit={onSubmit}>
        <h2 style={styles.formHeading}>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          required
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div style={styles.actionsRow}>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            style={styles.forgotButton}
            disabled={loading}
          >
            Forgot Password?
          </button>
          <button type="button" style={styles.googleButton} disabled={loading}>
            Sign in with Google
          </button>
        </div>

        <div style={styles.newUserText}>
          New user?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={styles.linkButton}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
