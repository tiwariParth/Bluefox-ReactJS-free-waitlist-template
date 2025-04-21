import { useState } from 'react'
import BluefoxLogo from './assets/react.svg'

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const showNotification = (type, message) => {
    setNotification({ type, message })
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const sublistId = import.meta.env.VITE_SUBLIST_ID
      const authToken = import.meta.env.VITE_BLUEFOX_AUTH
      
      if (!sublistId || !authToken) {
        throw new Error('Missing API credentials. Please check your .env file.')
      }
      
      const response = await fetch('https://api.bluefoxemail.com/v1/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          sublist_id: sublistId,
          email: formData.email,
          name: formData.name,
          custom_fields: {
            reason: formData.reason || 'Not specified'
          }
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      
      showNotification('success', 'Thank you for joining our waitlist!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        reason: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
      showNotification('error', error.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container">
      <header className="header">
        <img src={BluefoxLogo} alt="BlueFox Logo" className="logo" />
        <h1 className="header-title">
          Join Our <span className="gradient-text">Waitlist</span>
        </h1>
        <p className="header-subtitle">
          Be the first to know when we launch our new product. Sign up below to secure your spot.
        </p>
      </header>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="reason" className="form-label">Why are you interested? (Optional)</label>
            <textarea
              id="reason"
              name="reason"
              className="form-input"
              rows="3"
              placeholder="Tell us why you're interested"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>
      </div>
      
      {notification && (
        <div className="toast-container">
          <div className={`toast toast-${notification.type}`}>
            <div>{notification.message}</div>
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
    </div>
  )
}