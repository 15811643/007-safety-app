import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import modular components
import Dashboard from './components/Dashboard';
import HazardAlerts from './components/HazardAlerts';
import IncidentReporting from './components/IncidentReporting';
import ComplianceTraining from './components/ComplianceTraining';
import EmergencyResponse from './components/EmergencyResponse';
import TeamDashboard from './components/TeamDashboard';
import Settings from './components/Settings';

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    // Prefer system theme on first load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // For nav link highlighting
  function NavLink({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={isActive ? 'active' : ''}>{children}</Link>
    );
  }

  return (
    <Router>
      <nav>
        <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🦺</span>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/hazards">Hazard Alerts</NavLink>
        <NavLink to="/incidents">Incident Reporting</NavLink>
        <NavLink to="/compliance">Compliance & Training</NavLink>
        <NavLink to="/emergency">Emergency Response</NavLink>
        <NavLink to="/team">Team Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hazards" element={<HazardAlerts />} />
          <Route path="/incidents" element={<IncidentReporting />} />
          <Route path="/compliance" element={<ComplianceTraining />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/team" element={<TeamDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;