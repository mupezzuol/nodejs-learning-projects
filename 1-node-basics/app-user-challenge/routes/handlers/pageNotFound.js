const path = require('path');
const rootDir = require('../../util/path');

const express = require('express');
const router = express.Router();

// Handler Error - Page Not Found
router.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, '../', 'views', 'handlers', 'page-not-found.html'));
});

module.exports = router;