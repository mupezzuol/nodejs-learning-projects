const express = require('express');
const router = express.Router();

// Temp Var
const products = [];

// /admin/product => GET
router.get('/product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/product'
    });
});

// /admin/product => POST
router.post('/product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;