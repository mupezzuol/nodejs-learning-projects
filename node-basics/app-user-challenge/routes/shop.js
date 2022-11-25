const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // 1 Param: __dirname -> root of project founder in all SO (windows, mac and linux)
    // 2 Param: root folder
    // 3 Param: folder of views
    // 4 Param: file
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;