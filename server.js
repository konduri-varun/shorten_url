const express = require('express');
const path = require('path');
const urlRoutes = require('./routes/url');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);
app.use('/api', urlRoutes); // API routes under /api

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'client')));

// Fallback for React Router or direct navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`URL Shortener Microservice running on port ${PORT}`);
});
