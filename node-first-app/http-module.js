const http = require('http');

const server = http.createServer( (req, res) => {
    // Checking the request object values
    console.log(`URL: ${req.url}`);
    console.log(`METHOD: ${req.method}`);
    console.log(`HEADERS: ${req.headers}`);

    // Setting the type of response to browser, will be a text/html where we can return one html page for example
    res.setHeader('Content-Type', 'text/html');

    // Adding the content on the response object
    res.write(`<html>
    <head>
        <title>HTTP Module JS</title>
    </head>
    <body>
        <h1>Hello Worls! My first Node JS server running...</h1>
    </body>
    </html>`);

    // Response -> End = Return the response to client
    res.end();
} );

server.listen(3000);