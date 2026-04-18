// Keep backend alive by pinging every 10 minutes
const BACKEND_URL = 'https://sansthaen-and-samvidhan1.onrender.com';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

function pingBackend() {
  fetch(BACKEND_URL)
    .then(response => {
      console.log('✅ Backend is alive:', response.status);
    })
    .catch(error => {
      console.log('⚠️ Backend ping failed:', error.message);
    });
}

// Ping immediately on page load
pingBackend();

// Then ping every 10 minutes
setInterval(pingBackend, PING_INTERVAL);

console.log('🔄 Keep-alive service started');
