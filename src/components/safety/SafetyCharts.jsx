import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Incident Trend Chart
export const IncidentTrendChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Incident Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Incidents"
          />
          <Line 
            type="monotone" 
            dataKey="nearMisses" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Near Misses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Safety Score Chart
export const SafetyScoreChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Score Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="safetyScore" fill="#10b981" name="Safety Score %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Incident Type Distribution
export const IncidentTypeChart = ({ data }) => {
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Incident Types</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Department Safety Comparison
export const DepartmentSafetyChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Safety Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
          <Bar dataKey="inspections" fill="#3b82f6" name="Inspections" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Safety Metrics Summary
export const SafetyMetricsSummary = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-red-600">Total Incidents</h4>
        <p className="text-2xl font-bold text-red-900">{metrics.totalIncidents}</p>
        <p className="text-xs text-red-600">
          {metrics.incidentChange > 0 ? '+' : ''}{metrics.incidentChange}% from last month
        </p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-green-600">Safety Score</h4>
        <p className="text-2xl font-bold text-green-900">{metrics.safetyScore}%</p>
        <p className="text-xs text-green-600">
          {metrics.safetyChange > 0 ? '+' : ''}{metrics.safetyChange}% from last month
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-600">Inspections</h4>
        <p className="text-2xl font-bold text-blue-900">{metrics.inspections}</p>
        <p className="text-xs text-blue-600">
          {metrics.inspectionChange > 0 ? '+' : ''}{metrics.inspectionChange}% from last month
        </p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-purple-600">Training Hours</h4>
        <p className="text-2xl font-bold text-purple-900">{metrics.trainingHours}</p>
        <p className="text-xs text-purple-600">
          {metrics.trainingChange > 0 ? '+' : ''}{metrics.trainingChange}% from last month
        </p>
      </div>
    </div>
  );
}; 