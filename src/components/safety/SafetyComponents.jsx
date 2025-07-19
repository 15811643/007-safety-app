import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  ShieldCheckIcon, 
  BellIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Incident Reporting Form
export const IncidentReportForm = ({ onSubmit }) => {
  const schema = yup.object({
    incidentType: yup.string().required('Incident type is required'),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required'),
    severity: yup.string().required('Severity is required'),
    witnesses: yup.string(),
    immediateActions: yup.string().required('Immediate actions taken is required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900">Incident Report</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Incident Type</label>
        <select {...register('incidentType')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="">Select type</option>
          <option value="injury">Injury</option>
          <option value="near-miss">Near Miss</option>
          <option value="property-damage">Property Damage</option>
          <option value="environmental">Environmental</option>
          <option value="security">Security</option>
        </select>
        {errors.incidentType && <p className="text-red-500 text-sm">{errors.incidentType.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input {...register('location')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register('description')} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Severity</label>
        <select {...register('severity')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="">Select severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        {errors.severity && <p className="text-red-500 text-sm">{errors.severity.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Witnesses (if any)</label>
        <input {...register('witnesses')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Immediate Actions Taken</label>
        <textarea {...register('immediateActions')} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.immediateActions && <p className="text-red-500 text-sm">{errors.immediateActions.message}</p>}
      </div>

      <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
        Submit Incident Report
      </button>
    </form>
  );
};

// Safety Checklist Component
export const SafetyChecklist = ({ checklist, onComplete }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isComplete = checklist.every(item => checkedItems[item.id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Checklist</h3>
      
      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={item.id}
              checked={checkedItems[item.id] || false}
              onChange={() => handleCheck(item.id)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor={item.id} className="text-sm text-gray-700">
              {item.description}
            </label>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 text-sm">✓ All safety checks completed!</p>
        </div>
      )}

      <button
        onClick={() => onComplete && onComplete(checkedItems)}
        disabled={!isComplete}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
      >
        Complete Checklist
      </button>
    </div>
  );
};

// Emergency Alert Component
export const EmergencyAlert = ({ type, message, onAcknowledge }) => {
  const alertStyles = {
    critical: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-600 text-white'
  };

  return (
    <div className={`${alertStyles[type]} p-4 rounded-lg shadow-lg flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        <ExclamationTriangleIcon className="h-6 w-6" />
        <div>
          <h4 className="font-semibold">Emergency Alert</h4>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button
        onClick={onAcknowledge}
        className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm hover:bg-opacity-30"
      >
        Acknowledge
      </button>
    </div>
  );
};

// Safety Dashboard Component
export const SafetyDashboard = ({ metrics }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Safety Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Incidents</p>
              <p className="text-2xl font-semibold text-red-900">{metrics.incidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Safety Score</p>
              <p className="text-2xl font-semibold text-green-900">{metrics.safetyScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Inspections</p>
              <p className="text-2xl font-semibold text-blue-900">{metrics.inspections}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Team Members</p>
              <p className="text-2xl font-semibold text-purple-900">{metrics.teamMembers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Emergency Contact Manager
export const EmergencyContactManager = ({ contacts, onAddContact, onEditContact, onDeleteContact }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Emergency Contacts</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Contact
        </button>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">{contact.name}</h4>
              <p className="text-sm text-gray-600">{contact.role}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingContact(contact)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteContact(contact.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 