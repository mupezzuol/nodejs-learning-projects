const http = require('node:http');

const express = require('express');
const app = express();


app.use((req, res, next) => {
    console.log('In the middleware!');

    // We need to send to `next` function/middleware that we have, then the middleware below will be executed, because will continue the journey
    // Without this next command, the console log for another middleware won't be executed.
    // Without Next, just will return the response/browser.
    next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In another middleware!');
});

const server = http.createServer(app);
server.listen(3000);