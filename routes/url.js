const express = require('express');
const router = express.Router();
const urlStore = require('../models/urlStore');
const { nanoid } = require('nanoid');

// Helper: Validate shortcode
function isValidShortcode(code) {
    return /^[a-zA-Z0-9]{4,20}$/.test(code);
}

// Create short URL
router.post('/shorten', (req, res) => {
    const { longUrl, validity, shortcode } = req.body;
    if (!longUrl || typeof longUrl !== 'string') {
        return res.status(400).json({ error: 'Malformed input: longUrl required.' });
    }
    let code = shortcode;
    if (code) {
        if (!isValidShortcode(code)) {
            return res.status(400).json({ error: 'Invalid shortcode format.' });
        }
        if (urlStore.exists(code)) {
            return res.status(409).json({ error: 'Shortcode already exists.' });
        }
    } else {
        do {
            code = nanoid(7);
        } while (urlStore.exists(code));
    }
    const validMinutes = Number.isInteger(validity) ? validity : 30;
    urlStore.save(code, longUrl, validMinutes);
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${code}`, validity: validMinutes });
});

// Redirect
router.get('/:code', (req, res) => {
    const { code } = req.params;
    const entry = urlStore.get(code);
    if (!entry) {
        return res.status(404).json({ error: 'Shortcode not found.' });
    }
    if (Date.now() > entry.expiresAt) {
        return res.status(410).json({ error: 'Shortcode expired.' });
    }
    res.redirect(entry.longUrl);
});

module.exports = router;
