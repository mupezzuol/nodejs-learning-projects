const express = require('express');
const app = express();


app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('First middleware!');
    res.send('<h1>The "Add Product" page!</h1>');
});

app.use('/', (req, res, next) => {
    console.log('Second middleware!');
    res.send('<h1>Hello World! With Express.</h1>');
});

// app.use((req, res, next) => {
//     console.log('In the middleware!');

//     // We need to send to `next` function/middleware that we have, then the middleware below will be executed, because will continue the journey
//     // Without this next command, the console log for another middleware won't be executed.
//     // Without Next, just will return the response/browser.
//     next(); // Allows the request to continue to the next middleware in line
// });

// app.use((req, res, next) => {
//     console.log('In another middleware!');
//     res.send('<h1>Hello World! With Express.</h1>');
// });

app.listen(3000);