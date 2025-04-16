import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(100);

  // Handle progress bar countdown
  useEffect(() => {
    let timer;
    if (notification.show) {
      setProgress(100);

      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            setNotification({ show: false, message: '' });
            return 0;
          }
          return prevProgress - 1;
        });
      }, 30); // ~3 seconds to complete (100 * 30ms)
    }

    return () => clearInterval(timer);
  }, [notification.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const url = `https://api.bluefox.email/v1/subscriber-lists/${import.meta.env.VITE_SUBLIST_ID}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${import.meta.env.VITE_BLUEFOX_AUTH}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });
  
      const responseData = await response.json(); // Parse the response JSON
  
      if (!response.ok) {
        throw new Error(`Error: ${responseData.message || 'Failed to add subscriber'}`);
      }
  
      setNotification({
        show: true,
        message: `Thanks ${formData.name}! You've been added to our waitlist. We'll notify you when we launch!`,
      });
    } catch (error) {
      console.error(error); // Log the detailed error
      setNotification({
        show: true,
        message: `An error occurred: ${error.message}. Please try again.`,
      });
    }
  
    // Reset form after submission
    setFormData({ name: '', email: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Join Our Waitlist
          </h1>
          <p className="text-cyan-400">Be the first to know when we launch!</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg border border-purple-500/20"
        >
          <div className="mb-6">
            <label className="block text-cyan-400 mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white border ${
                errors.name ? 'border-red-500' : 'border-purple-500'
              } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-cyan-400 mb-2 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white border ${
                errors.email ? 'border-red-500' : 'border-purple-500'
              } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-cyan-400 mb-2 font-medium" htmlFor="reason">
              Why are you interested? (optional)
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-700 text-white border border-purple-500 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Tell us why you're excited..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-md font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          >
            Join the Waitlist
          </button>
        </form>
      </div>

      {/* Notification Slider */}
      <div
        className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
          notification.show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-md mx-auto mb-6 bg-gray-800 rounded-t-lg shadow-lg border-t-2 border-x-2 border-cyan-400 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm text-cyan-400">{notification.message}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;