const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(
        `<form action="/product" method="POST">
            <label for="fname">First name:</label><br>
            <input type="text" id="productName" name="productName"><br>
            <input type="submit" value="Submit">
        </form>`
    );
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;