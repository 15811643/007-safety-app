import React, { useState, useEffect } from 'react';

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

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock KPI data
  const kpis = [
    { label: 'Total Incidents', value: 12, type: 'lagging' },
    { label: 'Hours Worked', value: 2840, type: 'leading' },
    { label: 'Near Misses', value: 8, type: 'leading' },
    { label: 'Safety Observations', value: 45, type: 'leading' },
    { label: 'Training Completions', value: 23, type: 'leading' },
    { label: 'Equipment Inspections', value: 67, type: 'leading' },
    { label: 'Safety Meetings', value: 15, type: 'leading' },
  ];

  return (
    <div className="page">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="heading">🦺 Safety Dashboard</h1>
            <p style={{ color: 'var(--color-text)', opacity: 0.8, margin: 0, fontSize: '1.3rem' }}>
              Real-time safety performance monitoring and KPI tracking
            </p>
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
      </div>
    </div>
  );
}

export default Dashboard; 