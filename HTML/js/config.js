// Auto-detect environment
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000'
  : 'https://sansthaen-and-samvidhan1.onrender.com';

console.log('🌐 API URL:', API_BASE_URL);
