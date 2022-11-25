// Express Framework
const express = require('express');
const bodyParser = require('body-parser');

// Creating an instance of our Application
const app = express();

// Import Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFound = require('./routes/handlers/pageNotFound');

// Parsing Bodies
app.use(bodyParser.urlencoded({extended: false}));

// Using Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Handler Routes
app.use(pageNotFound);

// Server Running
app.listen(3000);