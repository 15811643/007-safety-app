import React, { useState } from 'react';
import '../styles/nav.css';
import '../styles/card.css';
import '../styles/form.css';
import { useAuth } from './auth/AuthProvider';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function Settings() {
  const { user, updateUserRole, hasPermission } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@company.com', role: 'worker', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'supervisor', status: 'active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@company.com', role: 'safety_admin', status: 'active' },
    { id: 4, name: 'Lisa Brown', email: 'lisa@company.com', role: 'worker', status: 'inactive' }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'worker' });

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      ...newUser,
      status: 'active'
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'worker' });
    setShowAddUser(false);
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  return (
    <div style={pageStyle}>
      <h1>⚙️ Settings</h1>
      <p>User management, preferences, and account settings.</p>
      
      {/* User Profile */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '1rem', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#3b82f6', marginBottom: '1rem' }}>👤 User Profile</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name:</label>
            <input 
              type="text" 
              value={user?.name || ''} 
              readOnly
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem',
                background: '#f9fafb'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
            <input 
              type="email" 
              value={user?.email || ''} 
              readOnly
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem',
                background: '#f9fafb'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Role:</label>
            <select 
              value={user?.role || 'worker'} 
              onChange={(e) => updateUserRole(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem'
              }}
            >
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="safety_admin">Safety Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Management (Admin Only) */}
      {hasPermission('manage_users') && (
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '1rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#3b82f6' }}>👥 User Management</h2>
            <button 
              onClick={() => setShowAddUser(true)}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Add User
            </button>
          </div>

          {/* Add User Form */}
          {showAddUser && (
            <form onSubmit={handleAddUser} style={{ 
              background: '#f9fafb', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                />
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={{ padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                >
                  <option value="worker">Worker</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="safety_admin">Safety Admin</option>
                </select>
                <button type="submit" style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}>
                  Add User
                </button>
              </div>
            </form>
          )}

          {/* Users List */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Role</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>{user.name}</td>
                    <td style={{ padding: '0.75rem' }}>{user.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <select 
                        value={user.role}
                        onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                        style={{ padding: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '0.25rem' }}
                      >
                        <option value="worker">Worker</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="safety_admin">Safety Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        background: user.status === 'active' ? '#10b981' : '#ef4444',
                        color: 'white'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button 
                        onClick={() => handleToggleUserStatus(user.id)}
                        style={{
                          background: user.status === 'active' ? '#ef4444' : '#10b981',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings; 