import { useState } from 'react'
function Settings({ onClose, emergencyContacts, setEmergencyContacts }) {
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [settings, setSettings] = useState({
    autoLocation: true,
    panicModeEnabled: true,
    checkInReminders: true,
    darkMode: false
  })

  const addContact = () => {
    if (newContact.name && newContact.number) {
      setEmergencyContacts([...emergencyContacts, newContact])
      setNewContact({ name: '', number: '' })
    }
  }

  const removeContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index)
    setEmergencyContacts(updatedContacts)
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Emergency Contacts</h3>
            <div className="add-contact">
              <input
                type="text"
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="contact-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.number}
                onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                className="contact-input"
              />
              <button onClick={addContact} className="add-btn">Add</button>
            </div>
            
            <div className="contacts-list">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-item-settings">
                  <span>{contact.name}: {contact.number}</span>
                  <button 
                    onClick={() => removeContact(index)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h3>App Preferences</h3>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.autoLocation}
                  onChange={(e) => updateSetting('autoLocation', e.target.checked)}
                />
                Auto-location tracking
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.panicModeEnabled}
                  onChange={(e) => updateSetting('panicModeEnabled', e.target.checked)}
                />
                Enable panic button
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.checkInReminders}
                  onChange={(e) => updateSetting('checkInReminders', e.target.checked)}
                />
                Check-in reminders
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting('darkMode', e.target.checked)}
                />
                Dark mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 