import React, { useState } from 'react';
import {
  getUsersByRole,
  setUserRole,
  assignTraining,
  removeTraining,
  promoteUserRole,
  demoteUserRole,
  sendNotification,
  sendNotificationExcept,
  validateUser,
  createUser,
  deleteUser,
  listUsers,
  getUsersWithIncompleteTraining,
} from '../logic/userManagement';

function downloadCSV(users) {
  const headers = ['id', 'name', 'role', 'training', 'notifications'];
  const rows = users.map(u => [
    u.id,
    u.name,
    u.role,
    (u.training || []).map(t => `${t.name} (${t.status})`).join('; '),
    (u.notifications || []).map(n => `${n.message} (${n.date})`).join('; '),
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.map(x => '"' + x + '"').join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function parseCSV(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split('\n');
    const [header, ...rows] = lines;
    const keys = header.split(',');
    const users = rows.filter(Boolean).map(row => {
      const values = row.split(',').map(x => x.replace(/"/g, ''));
      const user = {};
      keys.forEach((k, i) => user[k] = values[i]);
      user.training = (user.training || '').split('; ').filter(Boolean).map(t => {
        const [name, status] = t.split(' (');
        return { name, status: status?.replace(')', '') || 'assigned' };
      });
      user.notifications = (user.notifications || '').split('; ').filter(Boolean).map(n => {
        const [message, date] = n.split(' (');
        return { message, date: date?.replace(')', '') || '' };
      });
      return user;
    });
    callback(users);
  };
  reader.readAsText(file);
}

// Mock user data for demo (replace with real API calls)
const initialUsers = [
  { id: '1', name: 'Alice', role: 'worker', training: [], notifications: [] },
  { id: '2', name: 'Bob', role: 'supervisor', training: [], notifications: [] },
  { id: '3', name: 'Carol', role: 'safety_admin', training: [], notifications: [] },
  { id: '4', name: 'Dave', role: 'general_user', training: [], notifications: [] },
];

const roles = ['worker', 'supervisor', 'safety_admin', 'general_user'];

const AdminUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filterRole, setFilterRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [trainingName, setTrainingName] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationRole, setNotificationRole] = useState('worker');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [impersonatedUser, setImpersonatedUser] = useState(null);
  const [importError, setImportError] = useState('');
  const [rbac, setRBAC] = useState({}); // { userId: ['can_assign_training', ...] }

  // Filtered and searched users
  const displayedUsers = users.filter(user =>
    (!filterRole || user.role === filterRole) &&
    (!searchTerm || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || (user.training || []).some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Bulk selection
  const handleSelectUser = (userId, checked) => {
    setSelectedUserIds(checked ? [...selectedUserIds, userId] : selectedUserIds.filter(id => id !== userId));
  };
  const handleSelectAll = checked => {
    setSelectedUserIds(checked ? displayedUsers.map(u => u.id) : []);
  };

  // Bulk actions
  const handleBulkAssignTraining = () => {
    if (!trainingName) return;
    setUsers(users.map(u => selectedUserIds.includes(u.id) ? assignTraining(u, trainingName) : u));
    setAuditLog([...auditLog, { action: 'Bulk Assign Training', details: `Assigned '${trainingName}' to ${selectedUserIds.length} users`, date: new Date().toISOString() }]);
    setTrainingName('');
  };
  const handleBulkDelete = () => {
    setUsers(users.filter(u => !selectedUserIds.includes(u.id)));
    setAuditLog([...auditLog, { action: 'Bulk Delete', details: `Deleted ${selectedUserIds.length} users`, date: new Date().toISOString() }]);
    setSelectedUserIds([]);
  };

  // Edit user handlers
  const handleRoleChange = (user, newRole) => {
    setUsers(users.map(u => u.id === user.id ? setUserRole(u, newRole) : u));
  };
  const handlePromote = user => setUsers(users.map(u => u.id === user.id ? promoteUserRole(u) : u));
  const handleDemote = user => setUsers(users.map(u => u.id === user.id ? demoteUserRole(u) : u));
  const handleAssignTraining = user => {
    if (!trainingName) return;
    setUsers(users.map(u => u.id === user.id ? assignTraining(u, trainingName) : u));
    setAuditLog([...auditLog, { action: 'Assign Training', details: `Assigned '${trainingName}' to ${user.name}`, date: new Date().toISOString() }]);
    setTrainingName('');
  };
  const handleRemoveTraining = (user, tName) => setUsers(users.map(u => u.id === user.id ? removeTraining(u, tName) : u));
  const handleSendNotification = () => {
    setUsers(sendNotification(users, notificationRole, notificationMsg));
    setAuditLog([...auditLog, { action: 'Send Notification', details: `Sent notification to ${notificationRole} role`, date: new Date().toISOString() }]);
    setNotificationMsg('');
  };
  const handleDeleteUser = userId => setUsers(users.filter(u => u.id !== userId));

  // RBAC UI logic
  const handleRBACChange = (userId, perm, checked) => {
    setRBAC(prev => ({
      ...prev,
      [userId]: checked
        ? [...(prev[userId] || []), perm]
        : (prev[userId] || []).filter(p => p !== perm),
    }));
  };

  // Impersonate logic
  const handleImpersonate = user => setImpersonatedUser(user);
  const handleStopImpersonate = () => setImpersonatedUser(null);

  // Import logic
  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    parseCSV(file, importedUsers => {
      if (!importedUsers.length) setImportError('No users found in file.');
      else {
        setUsers([...users, ...importedUsers]);
        setImportError('');
      }
    });
  };

  // Use impersonated user for UI if set
  const effectiveUsers = impersonatedUser ? [impersonatedUser] : users;
  const effectiveDisplayedUsers = impersonatedUser ? [impersonatedUser] : displayedUsers;

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Admin User Management</h1>
      {/* Search and filter */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <label>Filter by Role: </label>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="">All</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by name or training"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ fontSize: '1rem', marginLeft: 8 }}
        />
      </div>
      {/* Bulk actions */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <input type="checkbox" checked={selectedUserIds.length === displayedUsers.length && displayedUsers.length > 0} onChange={e => handleSelectAll(e.target.checked)} /> Select All
        <input
          type="text"
          placeholder="Bulk assign training"
          value={trainingName}
          onChange={e => setTrainingName(e.target.value)}
          style={{ fontSize: '1rem', marginLeft: 8 }}
        />
        <button onClick={handleBulkAssignTraining} style={{ marginLeft: 4 }}>Assign to Selected</button>
        <button onClick={handleBulkDelete} style={{ marginLeft: 8, color: 'red' }}>Delete Selected</button>
      </div>
      {/* Export/Import, Impersonate, RBAC */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Advanced Tools</h2>
        <button onClick={() => downloadCSV(users)}>Export to CSV</button>
        <input type="file" accept=".csv" onChange={handleImport} style={{ marginLeft: 8 }} />
        {importError && <span style={{ color: 'red', marginLeft: 8 }}>{importError}</span>}
        <span style={{ marginLeft: 16 }}>
          Impersonate:
          <select onChange={e => handleImpersonate(users.find(u => u.id === e.target.value))} value={impersonatedUser?.id || ''} style={{ marginLeft: 4 }}>
            <option value="">-- Select User --</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          {impersonatedUser && <button onClick={handleStopImpersonate} style={{ marginLeft: 8 }}>Stop Impersonate</button>}
        </span>
      </div>
      {/* RBAC UI */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Role-Based Access Control (RBAC)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--color-bg-card)' }}>
          <thead>
            <tr style={{ background: 'var(--color-nav-link-active)', color: 'var(--color-primary)' }}>
              <th>User</th>
              <th>can_assign_training</th>
              <th>can_send_notifications</th>
              <th>can_promote_users</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td><input type="checkbox" checked={rbac[u.id]?.includes('can_assign_training') || false} onChange={e => handleRBACChange(u.id, 'can_assign_training', e.target.checked)} /></td>
                <td><input type="checkbox" checked={rbac[u.id]?.includes('can_send_notifications') || false} onChange={e => handleRBACChange(u.id, 'can_send_notifications', e.target.checked)} /></td>
                <td><input type="checkbox" checked={rbac[u.id]?.includes('can_promote_users') || false} onChange={e => handleRBACChange(u.id, 'can_promote_users', e.target.checked)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', background: 'var(--color-bg-card)' }}>
        <thead>
          <tr style={{ background: 'var(--color-nav-link-active)', color: 'var(--color-primary)' }}>
            <th><input type="checkbox" checked={selectedUserIds.length === displayedUsers.length && displayedUsers.length > 0} onChange={e => handleSelectAll(e.target.checked)} /></th>
            <th>Name</th>
            <th>Role</th>
            <th>Training</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map(user => (
            <tr key={user.id}>
              <td><input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={e => handleSelectUser(user.id, e.target.checked)} /></td>
              <td>{user.name}</td>
              <td>
                <select value={user.role} onChange={e => handleRoleChange(user, e.target.value)}>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button onClick={() => handlePromote(user)} title="Promote" style={{ marginLeft: 4 }}>⬆️</button>
                <button onClick={() => handleDemote(user)} title="Demote">⬇️</button>
              </td>
              <td>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {(user.training || []).map(t => (
                    <li key={t.name}>
                      {t.name} ({t.status}) <button onClick={() => handleRemoveTraining(user, t.name)} title="Remove">❌</button>
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Assign training"
                  value={trainingName}
                  onChange={e => setTrainingName(e.target.value)}
                  style={{ fontSize: '1rem', marginTop: 4 }}
                />
                <button onClick={() => handleAssignTraining(user)} style={{ marginLeft: 4 }}>Assign</button>
              </td>
              <td>
                <button onClick={() => setSelectedUser(user)}>View</button>
                <button onClick={() => handleDeleteUser(user.id)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Notification Center */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Send Notification</h2>
        <label>To Role: </label>
        <select value={notificationRole} onChange={e => setNotificationRole(e.target.value)}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          type="text"
          placeholder="Notification message"
          value={notificationMsg}
          onChange={e => setNotificationMsg(e.target.value)}
          style={{ fontSize: '1rem', marginLeft: 8 }}
        />
        <button onClick={handleSendNotification} style={{ marginLeft: 8 }}>Send</button>
      </div>
      {/* Training Dashboard */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Training Dashboard</h2>
        <div>Users with incomplete training: {getUsersWithIncompleteTraining(users).length}</div>
        <ul>
          {getUsersWithIncompleteTraining(users).map(u => <li key={u.id}>{u.name} ({u.role})</li>)}
        </ul>
      </div>
      {/* Audit Log */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Audit Log</h2>
        <ul>
          {auditLog.map((log, i) => <li key={i}>{log.date}: {log.action} - {log.details}</li>)}
        </ul>
      </div>
      {selectedUser && (
        <div style={{ border: '2px solid var(--color-primary)', borderRadius: 8, padding: '1.5rem', background: 'var(--color-bg-card)', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>User Profile: {selectedUser.name}</h2>
          <div>Role: {selectedUser.role}</div>
          <div>Training:
            <ul>
              {(selectedUser.training || []).map(t => <li key={t.name}>{t.name} ({t.status})</li>)}
            </ul>
          </div>
          <div>Notifications:
            <ul>
              {(selectedUser.notifications || []).map((n, i) => <li key={i}>{n.message} ({n.date})</li>)}
            </ul>
          </div>
          <button onClick={() => setSelectedUser(null)} style={{ marginTop: 12 }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement; 