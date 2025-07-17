import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/nav.css';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';

// Sample rolling 12-month safety data
const safetyData = [
  { month: '2024-01', hoursWorked: 10000, LTIs: 0, recordables: 1, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 20, employees: 25 },
  { month: '2024-02', hoursWorked: 9500, LTIs: 1, recordables: 2, daysLost: 3, DART: 1, nearMisses: 1, findings: 2, meetings: 1, trained: 22, employees: 25 },
  { month: '2024-03', hoursWorked: 11000, LTIs: 0, recordables: 0, daysLost: 0, DART: 0, nearMisses: 3, findings: 0, meetings: 2, trained: 24, employees: 25 },
  { month: '2024-04', hoursWorked: 10500, LTIs: 0, recordables: 1, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 23, employees: 25 },
  { month: '2024-05', hoursWorked: 9800, LTIs: 0, recordables: 0, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 25, employees: 25 },
  { month: '2024-06', hoursWorked: 12000, LTIs: 1, recordables: 2, daysLost: 5, DART: 1, nearMisses: 1, findings: 2, meetings: 1, trained: 20, employees: 25 },
  { month: '2024-07', hoursWorked: 11500, LTIs: 0, recordables: 1, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 22, employees: 25 },
  { month: '2024-08', hoursWorked: 10000, LTIs: 0, recordables: 0, daysLost: 0, DART: 0, nearMisses: 3, findings: 0, meetings: 2, trained: 24, employees: 25 },
  { month: '2024-09', hoursWorked: 10500, LTIs: 0, recordables: 1, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 23, employees: 25 },
  { month: '2024-10', hoursWorked: 9800, LTIs: 0, recordables: 0, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 25, employees: 25 },
  { month: '2024-11', hoursWorked: 12000, LTIs: 1, recordables: 2, daysLost: 5, DART: 1, nearMisses: 1, findings: 2, meetings: 1, trained: 20, employees: 25 },
  { month: '2024-12', hoursWorked: 11500, LTIs: 0, recordables: 1, daysLost: 0, DART: 0, nearMisses: 2, findings: 1, meetings: 2, trained: 22, employees: 25 },
];

function rollingSum(data, key) {
  return data.reduce((sum, d) => sum + (d[key] || 0), 0);
}
function rollingRate(numerator, denominator, multiplier) {
  return denominator > 0 ? (numerator * multiplier) / denominator : 0;
}

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
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  justifyItems: 'center',
  alignItems: 'stretch',
  width: '100%',
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

  // Rolling totals for the last 12 months
  const rollingHours = rollingSum(safetyData, 'hoursWorked');
  const rollingLTIs = rollingSum(safetyData, 'LTIs');
  const rollingRecordables = rollingSum(safetyData, 'recordables');
  const rollingDaysLost = rollingSum(safetyData, 'daysLost');
  const rollingDART = rollingSum(safetyData, 'DART');
  const rollingNearMisses = rollingSum(safetyData, 'nearMisses');
  const rollingFindings = rollingSum(safetyData, 'findings');
  const rollingMeetings = rollingSum(safetyData, 'meetings');
  const rollingTrained = safetyData.slice(-3).reduce((sum, d) => sum + (d.trained || 0), 0); // last 3 months
  const rollingEmployees = safetyData[safetyData.length - 1]?.employees || 1;

  // Lagging KPIs
  const LTIFR = rollingRate(rollingLTIs, rollingHours, 1_000_000);
  const TRIR = rollingRate(rollingRecordables, rollingHours, 200_000);
  const SeverityRate = rollingRate(rollingDaysLost, rollingHours, 1_000_000);
  const DART_Rate = rollingRate(rollingDART, rollingHours, 200_000);

  // Leading KPIs
  const NearMissRate = rollingRate(rollingNearMisses, rollingHours, 200_000);
  const TrainingCompletion = rollingEmployees > 0 ? (rollingTrained / (rollingEmployees * 3)) * 100 : 0; // % trained in last 3 months
  const AuditFindingsRate = rollingRate(rollingFindings, rollingHours, 200_000);
  const MeetingFrequency = rollingMeetings / 12; // average per month

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
    <div className="page" role="main" aria-label="Safety Dashboard main content">
      <div className="card dashboard-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="heading">🦺 Safety Dashboard</h1>
            <p style={{ color: 'var(--color-text)', opacity: 0.8, margin: 0, fontSize: '1.3rem' }}>
              Welcome back, {currentUser.username}! Real-time safety performance monitoring
            </p>
            <div style={getRoleBadgeStyle()} aria-label={`Current role: ${getRoleDisplayName()}`}>
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
        
        <h2 style={sectionTitle} id="leading-indicators">📈 Leading Indicators</h2>
        <ul className="kpi-grid" style={{ ...grid, listStyle: 'none', padding: 0 }} aria-labelledby="leading-indicators">
          <li className="kpi-card" style={kpiCard}>Near Miss Rate: {NearMissRate.toFixed(2)}</li>
          <li className="kpi-card" style={kpiCard}>Training Completion: {TrainingCompletion.toFixed(1)}%</li>
          <li className="kpi-card" style={kpiCard}>Audit Findings Rate: {AuditFindingsRate.toFixed(2)}</li>
          <li className="kpi-card" style={kpiCard}>Meeting Frequency: {MeetingFrequency.toFixed(2)} / month</li>
        </ul>
        
        <h2 style={sectionTitle} id="lagging-indicators">📊 Lagging Indicators</h2>
        <ul className="kpi-grid" style={{ ...grid, listStyle: 'none', padding: 0 }} aria-labelledby="lagging-indicators">
          <li className="kpi-card" style={kpiCard}>LTIFR: {LTIFR.toFixed(2)}</li>
          <li className="kpi-card" style={kpiCard}>TRIR: {TRIR.toFixed(2)}</li>
          <li className="kpi-card" style={kpiCard}>Severity Rate: {SeverityRate.toFixed(2)}</li>
          <li className="kpi-card" style={kpiCard}>DART Rate: {DART_Rate.toFixed(2)}</li>
        </ul>

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
            }}
            aria-label="Go to Safety Admin Panel"
            >
              Go to Safety Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 