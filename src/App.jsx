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
import TrafficProtectionPlan from './components/TrafficProtectionPlan';

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

function AppContent({ theme, setTheme }) {
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

  function NavLinkStyled({ to, children, requiredRole }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    if (requiredRole && (!user || user.role !== requiredRole)) {
      return null;
    }
    return (
      <Link
        to={to}
        className={isActive ? 'sidebar-link active' : 'sidebar-link'}
        style={{
          display: 'block',
          padding: '0.9rem 1.2rem',
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
          fontWeight: isActive ? 'bold' : 'normal',
          background: isActive ? 'var(--color-nav-link-active)' : 'none',
          color: isActive ? 'var(--color-primary)' : 'var(--color-nav-link)',
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        {children}
      </Link>
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

  // Sidebar navigation
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{
          width: '270px',
          background: 'var(--color-nav)',
          color: 'var(--color-nav-link)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1rem',
          fontSize: '1.35rem',
          minHeight: '100vh',
          position: 'sticky',
          top: 0,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-nav-link-active)' }}>🦺 Safety App</div>
          <NavLinkStyled to="/">Dashboard</NavLinkStyled>
          <NavLinkStyled to="/monitoring">Real-Time Monitoring</NavLinkStyled>
          <NavLinkStyled to="/hazards">Hazard Alerts</NavLinkStyled>
          <NavLinkStyled to="/incidents">Incident Reporting</NavLinkStyled>
          <NavLinkStyled to="/compliance">Compliance & Training</NavLinkStyled>
          <NavLinkStyled to="/emergency">Emergency Response</NavLinkStyled>
          <NavLinkStyled to="/team" requiredRole="supervisor">Team Dashboard</NavLinkStyled>
          <NavLinkStyled to="/admin" requiredRole="safety_admin">Safety Admin</NavLinkStyled>
          <NavLinkStyled to="/settings">Settings</NavLinkStyled>
          <NavLinkStyled to="/profile">My Profile</NavLinkStyled>
          <NavLinkStyled to="/traffic-protection-plan">Traffic Protection Plan</NavLinkStyled>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '1rem', color: 'var(--color-nav-link)', opacity: 0.8 }}>
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
                padding: '0.7rem 1.2rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.1rem',
                marginTop: '0.5rem',
              }}
            >
              Logout
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '2.5rem 2rem', background: 'var(--color-bg)', minHeight: '100vh' }}>
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
            <Route path="/traffic-protection-plan" element={<TrafficProtectionPlan />} />
            <Route path="*" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" style={{ color: 'var(--color-primary)' }}>Go back to Dashboard</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  const [theme, setTheme] = React.useState('light');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div style={{ position: 'fixed', top: 16, right: 24, zIndex: 1000 }}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <AuthProvider>
        <AppContent theme={theme} setTheme={setTheme} />
      </AuthProvider>
    </div>
  );
}

export default App;