// Data Service for Safety App
// This handles local storage and data persistence

class DataService {
  constructor() {
    this.storageKey = 'safetyAppData';
    this.initializeData();
  }

  // Initialize default data if none exists
  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultData = {
        incidents: [],
        checklists: [],
        users: [
          { id: 1, name: 'John Smith', email: 'john@company.com', role: 'worker', status: 'active' },
          { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'supervisor', status: 'active' },
          { id: 3, name: 'Mike Wilson', email: 'mike@company.com', role: 'safety_admin', status: 'active' }
        ],
        emergencyContacts: [
          { id: 1, name: 'John Smith', role: 'Safety Manager', phone: '555-0101' },
          { id: 2, name: 'Sarah Johnson', role: 'Emergency Coordinator', phone: '555-0102' },
          { id: 3, name: 'Mike Wilson', role: 'First Aid Officer', phone: '555-0103' }
        ],
        safetyMetrics: {
          incidents: 12,
          safetyScore: 96,
          inspections: 45,
          teamMembers: 25
        },
        settings: {
          notifications: true,
          autoSave: true,
          theme: 'light'
        }
      };
      this.saveData(defaultData);
    }
  }

  // Get all data
  getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading data:', error);
      return {};
    }
  }

  // Save all data
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Incident Management
  getIncidents() {
    const data = this.getData();
    return data.incidents || [];
  }

  addIncident(incident) {
    const data = this.getData();
    const newIncident = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'open',
      ...incident
    };
    data.incidents = [newIncident, ...data.incidents];
    this.saveData(data);
    return newIncident;
  }

  updateIncident(id, updates) {
    const data = this.getData();
    data.incidents = data.incidents.map(incident => 
      incident.id === id ? { ...incident, ...updates } : incident
    );
    this.saveData(data);
  }

  deleteIncident(id) {
    const data = this.getData();
    data.incidents = data.incidents.filter(incident => incident.id !== id);
    this.saveData(data);
  }

  // Checklist Management
  getChecklists() {
    const data = this.getData();
    return data.checklists || [];
  }

  addChecklist(checklist) {
    const data = this.getData();
    const newChecklist = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      completed: false,
      ...checklist
    };
    data.checklists = [newChecklist, ...data.checklists];
    this.saveData(data);
    return newChecklist;
  }

  completeChecklist(id, completedItems) {
    const data = this.getData();
    data.checklists = data.checklists.map(checklist => 
      checklist.id === id ? { ...checklist, completed: true, completedItems, completedAt: new Date().toISOString() } : checklist
    );
    this.saveData(data);
  }

  // User Management
  getUsers() {
    const data = this.getData();
    return data.users || [];
  }

  addUser(user) {
    const data = this.getData();
    const newUser = {
      id: Date.now(),
      status: 'active',
      createdAt: new Date().toISOString(),
      ...user
    };
    data.users = [...data.users, newUser];
    this.saveData(data);
    return newUser;
  }

  updateUser(id, updates) {
    const data = this.getData();
    data.users = data.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    );
    this.saveData(data);
  }

  deleteUser(id) {
    const data = this.getData();
    data.users = data.users.filter(user => user.id !== id);
    this.saveData(data);
  }

  // Emergency Contacts
  getEmergencyContacts() {
    const data = this.getData();
    return data.emergencyContacts || [];
  }

  addEmergencyContact(contact) {
    const data = this.getData();
    const newContact = {
      id: Date.now(),
      ...contact
    };
    data.emergencyContacts = [...data.emergencyContacts, newContact];
    this.saveData(data);
    return newContact;
  }

  updateEmergencyContact(id, updates) {
    const data = this.getData();
    data.emergencyContacts = data.emergencyContacts.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    );
    this.saveData(data);
  }

  deleteEmergencyContact(id) {
    const data = this.getData();
    data.emergencyContacts = data.emergencyContacts.filter(contact => contact.id !== id);
    this.saveData(data);
  }

  // Safety Metrics
  getSafetyMetrics() {
    const data = this.getData();
    return data.safetyMetrics || {};
  }

  updateSafetyMetrics(metrics) {
    const data = this.getData();
    data.safetyMetrics = { ...data.safetyMetrics, ...metrics };
    this.saveData(data);
  }

  // Settings
  getSettings() {
    const data = this.getData();
    return data.settings || {};
  }

  updateSettings(settings) {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.saveData(data);
  }

  // Export/Import Data
  exportData() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safety-app-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Backup and Restore
  createBackup() {
    const data = this.getData();
    const backup = {
      timestamp: new Date().toISOString(),
      data: data
    };
    localStorage.setItem('safetyAppBackup', JSON.stringify(backup));
    return backup;
  }

  restoreBackup() {
    try {
      const backup = localStorage.getItem('safetyAppBackup');
      if (backup) {
        const backupData = JSON.parse(backup);
        this.saveData(backupData.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring backup:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('safetyAppBackup');
    this.initializeData();
  }
}

// Create and export a singleton instance
const dataService = new DataService();
export default dataService; 