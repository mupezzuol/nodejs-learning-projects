const express = require('express');
const router = express.Router();

// Handler Error - Page Not Found
router.use((req, res, next) => {
    res.status(404).render('page-not-found', {pageTitle: 'Page Not Found'});
});

module.exports = router;