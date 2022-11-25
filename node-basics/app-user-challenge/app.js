const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send(
        `<form action="/product" method="POST">
            <label for="fname">First name:</label><br>
            <input type="text" id="productName" name="productName"><br>
            <input type="submit" value="Submit">
        </form>`
    );
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
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