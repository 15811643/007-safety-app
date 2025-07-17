import React, { useState } from 'react';
import '../styles/form.css';
import '../styles/card.css';

const loginStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '2rem',
};

const formStyle = {
  background: 'var(--color-bg-card)',
  padding: '2.5rem',
  borderRadius: '1.5rem',
  boxShadow: 'var(--shadow-card)',
  width: '100%',
  maxWidth: '400px',
  border: '1px solid var(--color-border)',
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  margin: '0.5rem 0',
  border: '1.5px solid var(--color-border)',
  borderRadius: '0.7rem',
  fontSize: '1.1rem',
  background: 'var(--color-bg-card)',
  color: 'var(--color-text)',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'worker'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Mock authentication - in real app, this would validate against backend
    const mockUsers = {
      'worker': { username: 'worker', password: 'worker123', role: 'worker' },
      'supervisor': { username: 'supervisor', password: 'super123', role: 'supervisor' },
      'admin': { username: 'admin', password: 'admin123', role: 'safety_admin' }
    };

    const user = mockUsers[credentials.role];
    if (user && credentials.username === user.username && credentials.password === user.password) {
      onLogin(user);
    } else {
      setError('Invalid credentials. Try: Worker: worker/worker123, Supervisor: supervisor/super123, Admin: admin/admin123');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={loginStyle}>
      <div style={formStyle}>
        <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '2rem', fontSize: '2rem' }}>
          🦺 Safety App Login
        </h1>
        <form onSubmit={handleSubmit} role="form" aria-label="Login form">
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              style={selectStyle}
              required
              aria-label="Select your role"
            >
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Safety Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={inputStyle}
              required
              aria-label="Username"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={inputStyle}
              required
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            className="cta-btn"
            style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}
            aria-label="Login"
          >
            Login
          </button>
          {error && (
            <div role="alert" aria-live="assertive" style={{ color: 'var(--color-danger)', marginTop: '1rem', fontWeight: 600 }}>
              {error}
            </div>
          )}
        </form>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: '0.7rem', fontSize: '0.9rem' }}>
          <strong>Demo Credentials:</strong><br/>
          <strong>Worker:</strong> worker / worker123<br/>
          <strong>Supervisor:</strong> supervisor / super123<br/>
          <strong>Safety Admin:</strong> admin / admin123
        </div>
      </div>
    </div>
  );
}

export default Login; 