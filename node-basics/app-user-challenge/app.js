// Express Framework
const express = require('express');
const bodyParser = require('body-parser');

// Creating an instance of our Application
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Parsing Bodies
app.use(bodyParser.urlencoded({extended: false}));

// Using Routes
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found!</h1>');
});

// Server Running
app.listen(3000);