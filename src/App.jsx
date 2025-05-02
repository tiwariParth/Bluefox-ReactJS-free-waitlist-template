import { useState, useEffect } from 'react';
import BluefoxLogo from './assets/bluefox-logo.png';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reasonMessage: '',
    captchaText: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [captchaProbe, setCaptchaProbe] = useState('');
  const [captchaHtml, setCaptchaHtml] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    fetch('https://api.bluefox.email/v1/captcha')
      .then((response) => response.json())
      .then((captchaData) => {
        setCaptchaHtml(captchaData.result.data);
        setCaptchaProbe(captchaData.result.probe);
      })
      .catch((error) => {
        console.error('Error fetching CAPTCHA:', error);
        setCaptchaHtml(`<p>Error loading captcha: ${error.message}</p>`);
      });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.captchaText.trim()) {
      newErrors.captcha = 'Please enter the captcha text';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) { return }

    setLoading(true);

    try {
      const sublistURL = import.meta.env.VITE_BLUEFOX_SUBLIST_URL;

      const response = await fetch(`${sublistURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          reasonMessage: formData.reasonMessage || 'Not specified',
          captchaText: formData.captchaText,
          captchaProbe: captchaProbe
        }),
      });

      if (response.status === 401) {
        const friendlyError = {
          status: 401,
          error: {
            name: "DOMAIN_WHITELIST_ERROR",
            message: "Domain not whitelisted. Please contact support."
          }
        };

        throw new Error(friendlyError.error.message);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Something went wrong');
      }

      showNotification('success', 'Thank you for joining our waitlist!');

      setFormData({
        name: '',
        email: '',
        reasonMessage: '',
        captchaText: ''
      });

      generateCaptcha();
    } catch (error) {
      console.error('Submission error:', error);
      showNotification('error', error.message || 'Failed to join waitlist. Please try again.');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes shrinkAnimation {
            from { width: 100%; }
            to { width: 0%; }
          }
          
          @keyframes slideInAnimation {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          .progress-bar {
            animation: shrinkAnimation 5s linear forwards;
            transform-origin: left;
          }
          
          .notification-toast {
            animation: slideInAnimation 0.5s ease-out forwards;
          }
        `}
      </style>
      
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <img src={BluefoxLogo} alt="BlueFox Logo" className="h-20 mb-4 mx-auto block" />
          <h1 className="text-4xl font-extrabold mb-4">
            Join Our <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Waitlist</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-[600px] mx-auto">
            Be the first to know when we launch our new product. Sign up below to secure your spot.
          </p>
        </header>
        
        <div className="max-w-[500px] mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 placeholder-gray-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 placeholder-gray-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="reasonMessage" className="block mb-2 font-medium text-gray-300">Why are you interested? (Optional)</label>
              <textarea
                id="reasonMessage"
                name="reasonMessage"
                className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 placeholder-gray-500"
                rows="3"
                placeholder="Tell us why you're interested"
                value={formData.reasonMessage}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-300">Verify you're human</label>
              <div className="flex items-center bg-white border border-gray-700 rounded-md p-2 mb-2.5 min-h-[60px]">
                <div className="flex-1 flex justify-center items-center text-black mr-2.5 overflow-hidden" 
                     dangerouslySetInnerHTML={{ __html: captchaHtml }}>
                </div>
                <button 
                  type="button" 
                  className="flex items-center justify-center bg-transparent border-none text-gray-600 cursor-pointer p-1.5 rounded hover:bg-gray-100 transition-colors"
                  onClick={generateCaptcha}
                  aria-label="Refresh captcha"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                id="captchaText"
                name="captchaText"
                className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 placeholder-gray-500"
                placeholder="Enter captcha text"
                value={formData.captchaText}
                onChange={handleChange}
              />
              {errors.captcha && <p className="text-red-500 text-sm mt-2">{errors.captcha}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>
        </div>
        
        {notification && (
          <div className="fixed top-4 right-4 z-50">
            <div 
              className={`p-4 rounded-md shadow-md min-w-[300px] max-w-[400px] notification-toast ${
                notification.type === 'success' 
                  ? 'bg-green-800 text-green-100' 
                  : 'bg-red-800 text-red-100'
              }`}
            >
              <div className="font-medium">{notification.message}</div>
              <div className="h-1 bg-white/30 rounded-full mt-2 w-full overflow-hidden">
                <div className="h-full bg-white rounded-full progress-bar"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
