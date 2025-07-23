// In-memory store for URLs
const store = {};

function save(code, longUrl, validityMinutes) {
    const now = Date.now();
    store[code] = {
        longUrl,
        createdAt: now,
        expiresAt: now + validityMinutes * 60 * 1000
    };
}

function get(code) {
    return store[code];
}

function exists(code) {
    return !!store[code];
}

module.exports = { save, get, exists };
