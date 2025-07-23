# AffordMed URL Shortener Microservice

## Overview
A robust HTTP URL Shortener Microservice with analytics, custom logging, and a React.js frontend.

## Features
- Shorten long URLs with globally unique shortcodes
- Custom validity period (default: 30 minutes)
- Custom shortcodes (if provided and unique)
- Redirection to original URL
- Robust error handling
- Mandatory custom logging middleware
- React.js frontend for easy usage

## Project Structure
```
Afformed/
├── client/           # React frontend (index.html, main.js)
├── middleware/       # Custom logger
├── models/           # In-memory URL store
├── routes/           # API endpoints
├── server.js         # Express backend
├── package.json      # Backend dependencies
└── README.md         # This file
```

## How to Run

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/).

### 2. Install Backend Dependencies
Open Command Prompt and run:
```
cd C:\Users\k.varun\Downloads\Afformed
npm install
```

### 3. Start the Application
```
npm start
```
The backend and frontend will run together at `http://localhost:3000`.

### 4. Use the Application
- Open `http://localhost:3000` in your browser.
- Enter a long URL and validity period, then click "Shorten".
- Copy and use the generated short URL.

## API Endpoints
- `POST /api/shorten` — Shorten a URL
- `GET /:shortcode` — Redirect to original URL

## Frontend
- Built with React.js, loaded via CDN for instant use
- No build step required

## Notes
- All data is stored in-memory (for demo purposes)
- For production, use a database and proper logging

## License
MIT
