const path = require('path');

const express = require('express');
const router = express.Router();

// Handler Error - Page Not Found
router.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../', '../', 'views', 'handlers', 'page-not-found.html'));
});

module.exports = router;