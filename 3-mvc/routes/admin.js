const express = require('express');
const router = express.Router();

// Controllers
const productsController = require('../controllers/products');

// /admin/product => GET
router.get('/product', productsController.getAddProduct);

// /admin/product => POST
router.post('/product', productsController.postAddProduct);

module.exports = router;