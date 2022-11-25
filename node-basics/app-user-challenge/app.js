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

// Server Running
app.listen(3000);