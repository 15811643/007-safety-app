import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      alert('Invalid credentials. Try:\nWorker: worker/worker123\nSupervisor: supervisor/super123\nAdmin: admin/admin123');
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
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Role:
            </label>
            <select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Safety Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            className="cta-btn"
            style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}
          >
            Login
          </button>
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