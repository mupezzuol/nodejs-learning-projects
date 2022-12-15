const express = require('express');
const router = express.Router();

// Controllers
const productsController = require('../controllers/products');

// Home
router.get('/', productsController.getProducts);

module.exports = router;