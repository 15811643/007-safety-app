import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('user');

  // Mock authentication for demo purposes
  // In production, replace with Auth0 or your preferred auth provider
  useEffect(() => {
    // Check if user is logged in (localStorage for demo)
    const savedUser = localStorage.getItem('safetyAppUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setUserRole(userData.role || 'user');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - replace with real authentication
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };

    setUser(mockUser);
    setUserRole(mockUser.role);
    localStorage.setItem('safetyAppUser', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setUserRole('user');
    localStorage.removeItem('safetyAppUser');
  };

  const register = async (email, password, name) => {
    // Mock registration
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };

    setUser(newUser);
    setUserRole('user');
    localStorage.setItem('safetyAppUser', JSON.stringify(newUser));
    return newUser;
  };

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      setUserRole(newRole);
      localStorage.setItem('safetyAppUser', JSON.stringify(updatedUser));
    }
  };

  const hasPermission = (permission) => {
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'view_reports'],
      manager: ['read', 'write', 'view_reports'],
      user: ['read', 'write']
    };

    return permissions[userRole]?.includes(permission) || false;
  };

  const value = {
    user,
    userRole,
    loading,
    login,
    logout,
    register,
    updateUserRole,
    hasPermission,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 