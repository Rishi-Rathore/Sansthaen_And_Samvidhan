const express = require('express');
const path = require('path');
const app = express();

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - Frontend: ${req.method} ${req.path}`);
    next();
});

// Serve static files from HTML directory with proper headers
app.use(express.static(path.join(__dirname, 'HTML'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Serve static files from root directory (for CSS and JS files)
app.use(express.static(__dirname));

// Route for forgot password page
app.get('/forgot', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'forgot.html'));
});

// Route for reset password page
app.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'reset.html'));
});

// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'log in.html'));
});

// Route for register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'register.html'));
});

// Route for test page
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'test-complete.html'));
});

// Default route - serve forgot page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'forgot.html'));
});

// Error handling
app.use((req, res) => {
    console.log(`404 - File not found: ${req.path}`);
    res.status(404).send(`
        <h2>File not found: ${req.path}</h2>
        <p>Available routes:</p>
        <ul>
            <li><a href="/forgot">Forgot Password</a></li>
            <li><a href="/reset">Reset Password</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/test">System Test</a></li>
        </ul>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
    console.log(`Backend API running on http://localhost:5000`);
    console.log('');
    console.log('🚀 TEST URLS:');
    console.log('📧 Forgot Password: http://localhost:3000/forgot');
    console.log('🔐 Reset Password: http://localhost:3000/reset');
    console.log('👤 Login: http://localhost:3000/login');
    console.log('📝 Register: http://localhost:3000/register');
    console.log('🧪 System Test: http://localhost:3000/test');
});