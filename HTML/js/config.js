// API Configuration - Automatically detects environment
const API_CONFIG = {
  // Check if running locally or in production
  getBaseURL: function() {
    // If localhost, use local backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    // Otherwise use production backend
    return 'https://sansthaen-and-samvidhan1.onrender.com';
  },
  
  // Get full API URL
  getURL: function(endpoint) {
    return this.getBaseURL() + endpoint;
  }
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;

console.log('🌐 API Base URL:', API_CONFIG.getBaseURL());
