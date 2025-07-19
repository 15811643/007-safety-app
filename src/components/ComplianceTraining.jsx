import React, { useState } from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';
import { SafetyChecklist } from './safety/SafetyComponents';
import dataService from '../services/dataService';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function ComplianceTraining() {
  const [activeChecklist, setActiveChecklist] = useState('daily');

  const dailyChecklist = [
    { id: 1, description: 'Check all safety equipment is in working order' },
    { id: 2, description: 'Verify emergency exits are clear and accessible' },
    { id: 3, description: 'Inspect work area for potential hazards' },
    { id: 4, description: 'Ensure proper PPE is available and worn' },
    { id: 5, description: 'Review safety procedures for today\'s tasks' }
  ];

  const weeklyChecklist = [
    { id: 1, description: 'Complete safety training modules' },
    { id: 2, description: 'Review incident reports and lessons learned' },
    { id: 3, description: 'Check fire extinguishers and emergency equipment' },
    { id: 4, description: 'Update safety documentation' },
    { id: 5, description: 'Attend safety meeting' }
  ];

  const monthlyChecklist = [
    { id: 1, description: 'Complete comprehensive safety audit' },
    { id: 2, description: 'Review and update emergency procedures' },
    { id: 3, description: 'Conduct safety equipment maintenance' },
    { id: 4, description: 'Update training certifications' },
    { id: 5, description: 'Review safety performance metrics' }
  ];

  const handleChecklistComplete = (checklistData) => {
    console.log('Checklist completed:', checklistData);
    
    // Save checklist completion to data service
    const checklist = {
      type: activeChecklist,
      items: checklistData,
      completedBy: 'Current User', // In real app, get from auth
      completedAt: new Date().toISOString()
    };
    
    dataService.addChecklist(checklist);
    alert('Safety checklist completed successfully!');
  };

  return (
    <div style={pageStyle}>
      <h1>📋 Compliance & Training</h1>
      <p>Track certifications, training modules, and safety checklists.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveChecklist('daily')}
            style={{
              padding: '0.8rem 1.5rem',
              background: activeChecklist === 'daily' ? '#3b82f6' : '#e5e7eb',
              color: activeChecklist === 'daily' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Daily Checklist
          </button>
          <button 
            onClick={() => setActiveChecklist('weekly')}
            style={{
              padding: '0.8rem 1.5rem',
              background: activeChecklist === 'weekly' ? '#3b82f6' : '#e5e7eb',
              color: activeChecklist === 'weekly' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Weekly Checklist
          </button>
          <button 
            onClick={() => setActiveChecklist('monthly')}
            style={{
              padding: '0.8rem 1.5rem',
              background: activeChecklist === 'monthly' ? '#3b82f6' : '#e5e7eb',
              color: activeChecklist === 'monthly' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Monthly Checklist
          </button>
        </div>

        {activeChecklist === 'daily' && (
          <SafetyChecklist checklist={dailyChecklist} onComplete={handleChecklistComplete} />
        )}
        {activeChecklist === 'weekly' && (
          <SafetyChecklist checklist={weeklyChecklist} onComplete={handleChecklistComplete} />
        )}
        {activeChecklist === 'monthly' && (
          <SafetyChecklist checklist={monthlyChecklist} onComplete={handleChecklistComplete} />
        )}
      </div>
    </div>
  );
}

export default ComplianceTraining; 