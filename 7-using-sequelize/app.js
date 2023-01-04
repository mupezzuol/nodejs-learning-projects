const path = require('path');

const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware that will be called before all others middleware because of the order here.
// This is simulating one Handler Request comparing between in the Spring in the Java
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            // Adding User object from database into a new field in the Request object of Express JS
            // If the field don't exist in Request object, then is created
            req.user = user;
            next(); // Continue to the next middleware
        })
        .catch(err => console.log(err))
});

// Middlewares - Request Incoming
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// DB - RELATIONSHIP
// Product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Product.belongsToMany(Cart, { through: CartItem}); // Many-to-Many (adding the place where will be added new table between many-to-many)

// User
User.hasMany(Product);// This line can be optional
User.hasOne(Cart);

// Cart
Cart.belongsTo(User);// This line can be optional
Cart.belongsToMany(Product, { through: CartItem}); // Many-to-Many (adding the place where will be added new table between many-to-many)

// Using Sequelize - Init config
sequelize
    // .sync({force: true}) -- Force update database, creating and deleting table always, not recommended, just in dev/init project
    .sync()
    .then(result => {
        // Check if exist User ID 1
        return User.findByPk(1);
    })
    .then(user => {
        // Create User just for tests if the user don't exist
        if (!user) {
            User.create({
                name: 'Murillo Pezzuol',
                email: 'test@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });