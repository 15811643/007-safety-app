import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const kpiCard = {
  background: 'var(--color-bg-card)',
  borderRadius: '1.2rem',
  boxShadow: 'var(--shadow-card)',
  padding: '2rem 1.5rem',
  margin: '1rem',
  minWidth: 220,
  textAlign: 'center',
};

const kpiValue = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: 'var(--color-primary)',
  margin: '0.5rem 0',
};

const kpiLabel = {
  fontSize: '1.2rem',
  color: 'var(--color-text)',
  opacity: 0.85,
  marginBottom: '0.5rem',
};

const sectionTitle = {
  fontSize: '2rem',
  color: 'var(--color-primary)',
  margin: '2rem 0 1rem 0',
  fontWeight: 600,
};

const grid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  justifyContent: 'center',
};

const roleBadge = {
  display: 'inline-block',
  padding: '0.5rem 1rem',
  borderRadius: '0.7rem',
  fontSize: '0.9rem',
  fontWeight: 600,
  marginBottom: '1rem',
};

function Dashboard({ user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Default user if not provided
  const currentUser = user || { role: 'worker', username: 'Worker' };
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock KPI data - different levels based on role
  const getKpis = () => {
    const baseKpis = [
      { label: 'Total Incidents', value: 12, type: 'lagging' },
      { label: 'Hours Worked', value: 2840, type: 'leading' },
      { label: 'Near Misses', value: 8, type: 'leading' },
      { label: 'Safety Observations', value: 45, type: 'leading' },
    ];

    if (currentUser.role === 'worker') {
      return [
        ...baseKpis,
        { label: 'My Training Completions', value: 5, type: 'leading' },
        { label: 'My Safety Observations', value: 12, type: 'leading' },
      ];
    } else if (currentUser.role === 'supervisor') {
      return [
        ...baseKpis,
        { label: 'Team Training Completions', value: 23, type: 'leading' },
        { label: 'Equipment Inspections', value: 67, type: 'leading' },
        { label: 'Safety Meetings', value: 15, type: 'leading' },
        { label: 'Team Performance Score', value: 87, type: 'leading' },
      ];
    } else if (currentUser.role === 'safety_admin') {
      return [
        ...baseKpis,
        { label: 'Training Completions', value: 23, type: 'leading' },
        { label: 'Equipment Inspections', value: 67, type: 'leading' },
        { label: 'Safety Meetings', value: 15, type: 'leading' },
        { label: 'Compliance Rate', value: 94, type: 'leading' },
        { label: 'Safety Score', value: 87, type: 'lagging' },
        { label: 'Days Since Last Incident', value: 23, type: 'lagging' },
      ];
    }

    return baseKpis;
  };

  const kpis = getKpis();

  const getRoleBadgeStyle = () => {
    switch (currentUser.role) {
      case 'worker':
        return { ...roleBadge, background: '#10b981', color: 'white' };
      case 'supervisor':
        return { ...roleBadge, background: '#3b82f6', color: 'white' };
      case 'safety_admin':
        return { ...roleBadge, background: '#f59e0b', color: 'white' };
      default:
        return { ...roleBadge, background: '#6b7280', color: 'white' };
    }
  };

  const getRoleDisplayName = () => {
    switch (currentUser.role) {
      case 'worker':
        return '👷 Worker';
      case 'supervisor':
        return '👨‍💼 Supervisor';
      case 'safety_admin':
        return '🔧 Safety Admin';
      default:
        return 'User';
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="heading">🦺 Safety Dashboard</h1>
            <p style={{ color: 'var(--color-text)', opacity: 0.8, margin: 0, fontSize: '1.3rem' }}>
              Welcome back, {currentUser.username}! Real-time safety performance monitoring
            </p>
            <div style={getRoleBadgeStyle()}>
              {getRoleDisplayName()}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {currentTime.toLocaleDateString()}
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--color-text)', opacity: 0.7 }}>
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div style={sectionTitle}>📈 Leading Indicators</div>
        <div style={grid}>
          {kpis.filter(k => k.type === 'leading').map(kpi => (
            <div key={kpi.label} style={kpiCard}>
              <div style={kpiLabel}>{kpi.label}</div>
              <div style={kpiValue}>{kpi.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
        
        <div style={sectionTitle}>📊 Lagging Indicators</div>
        <div style={grid}>
          {kpis.filter(k => k.type === 'lagging').map(kpi => (
            <div key={kpi.label} style={kpiCard}>
              <div style={kpiLabel}>{kpi.label}</div>
              <div style={kpiValue}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {currentUser.role === 'safety_admin' && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-bg)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>🔧 Admin Actions</h3>
            <p style={{ marginBottom: '1rem' }}>
              As a Safety Admin, you can access the Safety Admin page to input and manage KPI data.
            </p>
            <a href="/admin" style={{ 
              display: 'inline-block',
              background: 'var(--color-primary)',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '0.7rem',
              textDecoration: 'none',
              fontSize: '1.1rem'
            }}>
              Go to Safety Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 