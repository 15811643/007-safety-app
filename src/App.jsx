import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import modular components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HazardAlerts from './components/HazardAlerts';
import IncidentReporting from './components/IncidentReporting';
import ComplianceTraining from './components/ComplianceTraining';
import EmergencyResponse from './components/EmergencyResponse';
import TeamDashboard from './components/TeamDashboard';
import Settings from './components/Settings';
import SafetyAdmin from './components/SafetyAdmin';
import WorkerProfile from './components/WorkerProfile';
import RealTimeMonitoring from './components/RealTimeMonitoring';

// Import new safety modules
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { 
  IncidentReportForm, 
  SafetyChecklist, 
  EmergencyAlert, 
  SafetyDashboard as SafetyDashboardComponent,
  EmergencyContactManager 
} from './components/safety/SafetyComponents';
import { 
  IncidentTrendChart, 
  SafetyScoreChart, 
  IncidentTypeChart, 
  DepartmentSafetyChart,
  SafetyMetricsSummary 
} from './components/safety/SafetyCharts';

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

function AppContent() {
  const [theme, setTheme] = useState(() => {
    // Prefer system theme on first load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const { user, login, logout, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogin = (userData) => {
    login(userData.email, userData.password);
  };

  const handleLogout = () => {
    logout();
  };

  // For nav link highlighting
  function NavLink({ to, children, requiredRole }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    // Check if user has required role
    if (requiredRole && (!user || user.role !== requiredRole)) {
      return null;
    }
    
    return (
      <Link to={to} className={isActive ? 'active' : ''}>{children}</Link>
    );
  }

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="app-root" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--color-text)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦺</div>
          <div>Loading Safety App...</div>
        </div>
      </div>
    );
  }

  // If not logged in, show login page
  if (!isAuthenticated) {
    return (
      <Router>
        <div className="app-root">
          <Login onLogin={handleLogin} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <nav>
        <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🦺</span>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/monitoring">Real-Time Monitoring</NavLink>
        <NavLink to="/hazards">Hazard Alerts</NavLink>
        <NavLink to="/incidents">Incident Reporting</NavLink>
        <NavLink to="/compliance">Compliance & Training</NavLink>
        <NavLink to="/emergency">Emergency Response</NavLink>
        <NavLink to="/team" requiredRole="supervisor">Team Dashboard</NavLink>
        <NavLink to="/admin" requiredRole="safety_admin">Safety Admin</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-nav-link)', opacity: 0.8 }}>
            {user.role === 'worker' ? '👷 Worker' : 
             user.role === 'supervisor' ? '👨‍💼 Supervisor' : 
             user.role === 'safety_admin' ? '🔧 Safety Admin' : 'User'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1px solid var(--color-nav-link)',
              color: 'var(--color-nav-link)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/monitoring" element={<RealTimeMonitoring />} />
          <Route path="/hazards" element={<HazardAlerts />} />
          <Route path="/incidents" element={<IncidentReporting />} />
          <Route path="/compliance" element={<ComplianceTraining />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/team" element={
            user.role === 'supervisor' || user.role === 'safety_admin' ? 
            <TeamDashboard /> : 
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Access Denied</h1>
              <p>You need supervisor privileges to access this page.</p>
            </div>
          } />
          <Route path="/admin" element={
            user.role === 'safety_admin' ? 
            <SafetyAdmin /> : 
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Access Denied</h1>
              <p>You need safety admin privileges to access this page.</p>
            </div>
          } />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<WorkerProfile />} />
          <Route path="*" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <Link to="/" style={{ color: 'var(--color-primary)' }}>Go back to Dashboard</Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;