const path = require('path');

// Express Framework
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

// Import Routes
const adminRoutes = require('./routes/admin').routes;
const shopRoutes = require('./routes/shop');
const pageNotFound = require('./routes/pageNotFound');

// Creating an instance of our Application
const app = express();

// Setting Engine using some configuration, where is the layouts, extensio file of layouts etc...
app.engine(
    'hbs',
    expressHbs.engine({
        layoutsDir: './views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);

// What Template Engine Express will use
app.set('view engine', 'hbs');
// Where module 'views' will find folder, in this case the folder called 'views' as well
app.set('views', 'views');

// Parsing Bodies
app.use(bodyParser.urlencoded({extended: false}));

// Allow to access public/static files
app.use(express.static(path.join(__dirname, 'public')));

// Using Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Handler Errors Routes
app.use(pageNotFound);

// Server Running
app.listen(3000);