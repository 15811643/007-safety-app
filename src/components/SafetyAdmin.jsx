import React, { useState } from 'react';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };
const formCardStyle = {
  background: 'var(--color-bg-card)',
  borderRadius: '1rem',
  padding: '2rem',
  margin: '1.5rem 0',
  boxShadow: 'var(--shadow-card)',
  border: '1px solid var(--color-border)',
};
const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  margin: '0.5rem 0',
  border: '1.5px solid var(--color-border)',
  borderRadius: '0.7rem',
  fontSize: '1.1rem',
  background: 'var(--color-bg-card)',
  color: 'var(--color-text)',
};
const buttonStyle = {
  background: 'var(--color-primary)',
  color: 'white',
  padding: '0.9rem 1.5rem',
  border: 'none',
  borderRadius: '0.7rem',
  cursor: 'pointer',
  fontSize: '1.1rem',
  margin: '0.5rem 0.5rem 0.5rem 0',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  marginTop: '1rem',
};

function SafetyAdmin() {
  const [kpiData, setKpiData] = useState({
    incidents: { total: 12, lostTime: 2, medicalTreatment: 5, firstAid: 8 },
    hours: { total: 2840, period: 'month' },
    nearMisses: { count: 8, reported: 6 },
    observations: { count: 45, completed: 42 },
    training: { completions: 23, required: 25, compliance: 92 },
    inspections: { completed: 67, required: 70, compliance: 96 },
    meetings: { conducted: 15, required: 15, attendance: 85 }
  });

  const [newData, setNewData] = useState({
    incidents: { total: '', lostTime: '', medicalTreatment: '', firstAid: '' },
    hours: { total: '', period: 'month' },
    nearMisses: { count: '', reported: '' },
    observations: { count: '', completed: '' },
    training: { completions: '', required: '', compliance: '' },
    inspections: { completed: '', required: '', compliance: '' },
    meetings: { conducted: '', required: '', attendance: '' }
  });

  const handleInputChange = (category, field, value) => {
    setNewData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = (category) => {
    setKpiData(prev => ({
      ...prev,
      [category]: { ...prev[category], ...newData[category] }
    }));
    
    // Clear the form
    setNewData(prev => ({
      ...prev,
      [category]: Object.keys(prev[category]).reduce((acc, key) => {
        acc[key] = key === 'period' ? 'month' : '';
        return acc;
      }, {})
    }));
    
    alert(`${category} data updated successfully!`);
  };

  const renderForm = (category, title, fields) => (
    <div style={formCardStyle}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>
        {title}
      </h2>
      
      <div style={gridStyle}>
        {fields.map(field => (
          <div key={field.key}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>
              {field.label}:
            </label>
            {field.type === 'select' ? (
              <select
                value={newData[category][field.key]}
                onChange={(e) => handleInputChange(category, field.key, e.target.value)}
                style={inputStyle}
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'number'}
                value={newData[category][field.key]}
                onChange={(e) => handleInputChange(category, field.key, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                style={inputStyle}
              />
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={() => handleSubmit(category)}
        style={buttonStyle}
      >
        Update {title}
      </button>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: '0.7rem' }}>
        <strong>Current Values:</strong>
        {fields.map(field => (
          <div key={field.key} style={{ margin: '0.25rem 0' }}>
            {field.label}: {kpiData[category][field.key]}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <h1 className="heading">🔧 Safety Admin - KPI Management</h1>
      <p style={{ color: 'var(--color-text)', opacity: 0.8, marginBottom: '2rem', fontSize: '1.2rem' }}>
        Input and manage safety performance data and KPI metrics
      </p>

      {renderForm('incidents', 'Incident Data', [
        { key: 'total', label: 'Total Incidents', type: 'number' },
        { key: 'lostTime', label: 'Lost Time Injuries', type: 'number' },
        { key: 'medicalTreatment', label: 'Medical Treatment Cases', type: 'number' },
        { key: 'firstAid', label: 'First Aid Cases', type: 'number' }
      ])}

      {renderForm('hours', 'Hours Worked', [
        { key: 'total', label: 'Total Hours', type: 'number' },
        { key: 'period', label: 'Period', type: 'select', options: [
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'quarter', label: 'Quarter' },
          { value: 'year', label: 'Year' }
        ]}
      ])}

      {renderForm('nearMisses', 'Near Miss Data', [
        { key: 'count', label: 'Total Near Misses', type: 'number' },
        { key: 'reported', label: 'Reported Near Misses', type: 'number' }
      ])}

      {renderForm('observations', 'Safety Observations', [
        { key: 'count', label: 'Total Observations', type: 'number' },
        { key: 'completed', label: 'Completed Observations', type: 'number' }
      ])}

      {renderForm('training', 'Training Data', [
        { key: 'completions', label: 'Training Completions', type: 'number' },
        { key: 'required', label: 'Required Trainings', type: 'number' },
        { key: 'compliance', label: 'Compliance Rate (%)', type: 'number' }
      ])}

      {renderForm('inspections', 'Equipment Inspections', [
        { key: 'completed', label: 'Completed Inspections', type: 'number' },
        { key: 'required', label: 'Required Inspections', type: 'number' },
        { key: 'compliance', label: 'Compliance Rate (%)', type: 'number' }
      ])}

      {renderForm('meetings', 'Safety Meetings', [
        { key: 'conducted', label: 'Meetings Conducted', type: 'number' },
        { key: 'required', label: 'Required Meetings', type: 'number' },
        { key: 'attendance', label: 'Average Attendance (%)', type: 'number' }
      ])}
    </div>
  );
}

export default SafetyAdmin; 