// Custom Logging Middleware
module.exports = function (req, res, next) {
    // Log method, URL, timestamp, and body
    const logEntry = {
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
        body: req.body
    };
    // Store logEntry somewhere or print (for demo, print to file)
    // Replace this with your own logging logic as per pre-test setup
    // For now, just attach to req for demonstration
    req._logEntry = logEntry;
    next();
};
