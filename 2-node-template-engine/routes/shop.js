const path = require('path');
const rootDir = require('../util/path');

const express = require('express');
const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    // 1 Param: __dirname -> root of project founder in all SO (windows, mac and linux)
    // 2 Param: root folder
    // 3 Param: folder of views
    // 4 Param: file
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // NEW WAY USING TEMPLATE ENGINE + PUG
    // 1. Render use template engine default set up, in this case PUG
    // 2. we can pass the name of page without '.pug'
    // 3. we can put some objects, vars and 'path'
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;