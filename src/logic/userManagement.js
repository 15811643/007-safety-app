// User Management Logic Module
// Use this for all user, role, training, and notification logic

// Example user object structure:
// {
//   id: 'user123',
//   name: 'Jane Doe',
//   role: 'worker' | 'supervisor' | 'safety_admin' | 'general_user',
//   training: [ { name: 'WHMIS', status: 'complete', date: '2024-06-01' }, ... ],
//   notifications: [ ... ]
// }

// Get user role
export function getUserRole(user) {
  return user?.role || 'general_user';
}

// Set user role
export function setUserRole(user, role) {
  return { ...user, role };
}

// Assign training to a user
export function assignTraining(user, trainingName, date = new Date().toISOString().slice(0, 10)) {
  const newTraining = { name: trainingName, status: 'assigned', date };
  return { ...user, training: [...(user.training || []), newTraining] };
}

// Mark training as complete
export function completeTraining(user, trainingName, date = new Date().toISOString().slice(0, 10)) {
  return {
    ...user,
    training: (user.training || []).map(t =>
      t.name === trainingName ? { ...t, status: 'complete', date } : t
    ),
  };
}

// Send notification to users by type
export function sendNotification(users, userType, message) {
  return users.map(user =>
    user.role === userType
      ? { ...user, notifications: [...(user.notifications || []), { message, date: new Date().toISOString() }] }
      : user
  );
}

// Fetch user profile (mock, replace with real API call)
export function fetchUserProfile(userId) {
  // Example: fetch(`/api/users/${userId}`)
  return Promise.resolve({ id: userId, name: 'Demo User', role: 'worker', training: [], notifications: [] });
}

// Update user profile (mock, replace with real API call)
export function updateUserProfile(user) {
  // Example: fetch(`/api/users/${user.id}`, { method: 'PUT', body: JSON.stringify(user) })
  return Promise.resolve(user);
}

// Get all users by role/type
export function getUsersByRole(users, role) {
  return users.filter(user => user.role === role);
}

// Remove a training record from a user
export function removeTraining(user, trainingName) {
  return { ...user, training: (user.training || []).filter(t => t.name !== trainingName) };
}

// Get all users with incomplete training
export function getUsersWithIncompleteTraining(users) {
  return users.filter(user => (user.training || []).some(t => t.status !== 'complete'));
}

// Assign notification to all users except a certain type
export function sendNotificationExcept(users, excludedRole, message) {
  return users.map(user =>
    user.role !== excludedRole
      ? { ...user, notifications: [...(user.notifications || []), { message, date: new Date().toISOString() }] }
      : user
  );
}

// Promote user role (worker -> supervisor -> safety_admin)
export function promoteUserRole(user) {
  const order = ['worker', 'general_user', 'supervisor', 'safety_admin'];
  const idx = order.indexOf(user.role);
  return idx < order.length - 1 ? { ...user, role: order[idx + 1] } : user;
}

// Demote user role (safety_admin -> supervisor -> worker)
export function demoteUserRole(user) {
  const order = ['worker', 'general_user', 'supervisor', 'safety_admin'];
  const idx = order.indexOf(user.role);
  return idx > 0 ? { ...user, role: order[idx - 1] } : user;
}

// Validate user data (e.g., required fields)
export function validateUser(user) {
  if (!user.name || !user.role) return false;
  // Add more validation as needed
  return true;
}

// Admin CRUD stubs (replace with real API calls)
export function createUser(user) {
  // Example: POST to /api/users
  return Promise.resolve({ ...user, id: Math.random().toString(36).slice(2) });
}
export function deleteUser(userId) {
  // Example: DELETE to /api/users/:id
  return Promise.resolve(userId);
}
export function listUsers() {
  // Example: GET /api/users
  return Promise.resolve([]);
}

// Example usage in a component:
// import { getUserRole, assignTraining } from '../logic/userManagement';
// const role = getUserRole(user);
// const updatedUser = assignTraining(user, 'WHMIS'); 