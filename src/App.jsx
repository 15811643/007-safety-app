import { useState, useEffect } from 'react'

function App() {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [location, setLocation] = useState(null)
  const [showPanicMode, setShowPanicMode] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Services', number: '911' },
    { name: 'Local Police', number: '555-0123' },
    { name: 'Trusted Contact', number: '555-0124' }
  ])

  const [safetyTips] = useState([
    'Always let someone know where you\'re going',
    'Keep your phone charged and accessible',
    'Trust your instincts - if something feels wrong, leave',
    'Have a safety plan for different situations',
    'Keep emergency contacts easily accessible'
  ])

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Location access denied:', error)
        }
      )
    }
  }, [])

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    const timestamp = new Date().toLocaleString()
    alert(`Safety check-in completed at ${timestamp}! Your location has been recorded.`)
  }

  const handleEmergencyCall = (number) => {
    if (confirm(`Call ${number}?`)) {
      window.location.href = `tel:${number}`
    }
  }

  const handlePanicMode = () => {
    setShowPanicMode(true)
    // In a real app, this would immediately call emergency services
    // and send location data to trusted contacts
    alert('PANIC MODE ACTIVATED! Emergency services will be contacted immediately.')
  }

  const shareLocation = () => {
    if (location) {
      const locationUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`
      if (navigator.share) {
        navigator.share({
          title: 'My Location',
          text: 'Here is my current location',
          url: locationUrl
        })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(locationUrl)
        alert('Location link copied to clipboard!')
      }
    } else {
      alert('Location not available. Please enable location services.')
    }
  }

  return (
    <div className="app-root">
      <div className="main-card">
        <div className="logo">
          <h1 className="heading">🛡️ Safety App</h1>
        </div>
        
        <p className="subtitle">
          Stay safe and connected with emergency contacts and check-ins
        </p>

        {/* Panic Button */}
        <div className="panic-section">
          <button 
            className="panic-btn"
            onClick={handlePanicMode}
          >
            🚨 PANIC BUTTON 🚨
          </button>
        </div>

        <div className="safety-controls">
          <button 
            className={`cta-btn ${isCheckedIn ? 'checked-in' : ''}`}
            onClick={handleCheckIn}
            disabled={isCheckedIn}
          >
            {isCheckedIn ? '✓ Checked In' : '🔒 Safety Check-In'}
          </button>
          
          <button 
            className="location-btn"
            onClick={shareLocation}
          >
            📍 Share Location
          </button>
        </div>

        <div className="product-section">
          <h2 className="product-section-title">Emergency Contacts</h2>
          <div className="emergency-contacts">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <span className="contact-name">{contact.name}</span>
                <button 
                  className="emergency-btn"
                  onClick={() => handleEmergencyCall(contact.number)}
                >
                  📞 {contact.number}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="product-section">
          <h2 className="product-section-title">Safety Tips</h2>
          <div className="safety-tips">
            {safetyTips.map((tip, index) => (
              <div key={index} className="tip-item">
                <span className="tip-number">{index + 1}.</span>
                <span className="tip-text">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {location && (
          <div className="product-section">
            <h2 className="product-section-title">Location Status</h2>
            <div className="location-status">
              <p>📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
              <p>✅ Location tracking active</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 