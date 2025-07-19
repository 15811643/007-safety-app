import React, { useState, useEffect } from 'react';
import { 
  ExclamationTriangleIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { IncidentTrendChart, SafetyScoreChart } from './safety/SafetyCharts';
import dataService from '../services/dataService';

const RealTimeMonitoring = () => {
  const [liveData, setLiveData] = useState({
    activeWorkers: 25,
    currentAlerts: 2,
    lastIncident: '2 hours ago',
    safetyScore: 96,
    uptime: '99.8%'
  });

  const [predictiveInsights, setPredictiveInsights] = useState([
    { id: 1, type: 'warning', message: 'High risk of slips in Warehouse B due to recent cleaning', confidence: 85 },
    { id: 2, type: 'info', message: 'Equipment maintenance due in 3 days', confidence: 92 },
    { id: 3, type: 'success', message: 'Safety score trending upward - 15% improvement this month', confidence: 78 }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'incident', message: 'Near miss reported in Lab 3', time: '2 minutes ago', severity: 'medium' },
    { id: 2, type: 'checklist', message: 'Daily safety checklist completed by John Smith', time: '5 minutes ago', severity: 'low' },
    { id: 3, type: 'alert', message: 'Fire alarm test completed successfully', time: '10 minutes ago', severity: 'low' },
    { id: 4, type: 'training', message: 'Safety training completed by 5 workers', time: '15 minutes ago', severity: 'low' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update live data
      setLiveData(prev => ({
        ...prev,
        activeWorkers: Math.floor(Math.random() * 10) + 20, // Random between 20-30
        currentAlerts: Math.floor(Math.random() * 5), // Random between 0-4
        safetyScore: Math.max(85, Math.min(100, prev.safetyScore + (Math.random() - 0.5) * 2)) // Fluctuate around current score
      }));

      // Add new activity occasionally
      if (Math.random() < 0.3) { // 30% chance
        const newActivity = {
          id: Date.now(),
          type: ['incident', 'checklist', 'alert', 'training'][Math.floor(Math.random() * 4)],
          message: `New ${['incident', 'checklist', 'alert', 'training'][Math.floor(Math.random() * 4)]} activity`,
          time: 'Just now',
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        };
        setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'incident': return '🚨';
      case 'checklist': return '✅';
      case 'alert': return '⚠️';
      case 'training': return '📚';
      default: return '📋';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      <h1>📊 Real-Time Safety Monitoring</h1>
      <p>Live safety data, predictive insights, and real-time alerts.</p>

      {/* Live Metrics Dashboard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #10b981'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <ShieldCheckIcon style={{ width: '2rem', height: '2rem', color: '#10b981', marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#10b981' }}>Active Workers</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
            {liveData.activeWorkers}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Currently on site
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #ef4444'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <ExclamationTriangleIcon style={{ width: '2rem', height: '2rem', color: '#ef4444', marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#ef4444' }}>Active Alerts</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>
            {liveData.currentAlerts}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Requiring attention
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <ChartBarIcon style={{ width: '2rem', height: '2rem', color: '#3b82f6', marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#3b82f6' }}>Safety Score</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {liveData.safetyScore.toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Real-time calculation
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #8b5cf6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <ClockIcon style={{ width: '2rem', height: '2rem', color: '#8b5cf6', marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#8b5cf6' }}>System Uptime</h3>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            {liveData.uptime}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Last 30 days
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Predictive Insights */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#3b82f6', marginBottom: '1.5rem' }}>🤖 AI Predictive Insights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {predictiveInsights.map(insight => (
              <div key={insight.id} style={{ 
                padding: '1rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${insight.type === 'warning' ? '#f59e0b' : insight.type === 'info' ? '#3b82f6' : '#10b981'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem',
                    background: insight.type === 'warning' ? '#fef3c7' : insight.type === 'info' ? '#dbeafe' : '#d1fae5',
                    color: insight.type === 'warning' ? '#92400e' : insight.type === 'info' ? '#1e40af' : '#065f46'
                  }}>
                    {insight.type.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#3b82f6', marginBottom: '1.5rem' }}>📋 Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={{ 
                padding: '1rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${getSeverityColor(activity.severity)}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{getActivityIcon(activity.type)}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '500' }}>
                      {activity.message}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {activity.time}
                      </span>
                      <span style={{ 
                        padding: '0.125rem 0.375rem', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.75rem',
                        background: getSeverityColor(activity.severity) + '20',
                        color: getSeverityColor(activity.severity)
                      }}>
                        {activity.severity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Charts */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#3b82f6', marginBottom: '1.5rem' }}>📈 Live Safety Trends</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <IncidentTrendChart data={[
            { month: 'Now', incidents: liveData.currentAlerts, nearMisses: Math.floor(Math.random() * 5) },
            { month: '1h ago', incidents: 1, nearMisses: 2 },
            { month: '2h ago', incidents: 0, nearMisses: 1 },
            { month: '3h ago', incidents: 2, nearMisses: 3 },
            { month: '4h ago', incidents: 1, nearMisses: 1 },
            { month: '5h ago', incidents: 0, nearMisses: 2 }
          ]} />
          <SafetyScoreChart data={[
            { month: 'Now', safetyScore: liveData.safetyScore },
            { month: '1h ago', safetyScore: 95.5 },
            { month: '2h ago', safetyScore: 95.2 },
            { month: '3h ago', safetyScore: 94.8 },
            { month: '4h ago', safetyScore: 94.5 },
            { month: '5h ago', safetyScore: 94.2 }
          ]} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring; 