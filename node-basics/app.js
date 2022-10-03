const http = require('http');

const server = http.createServer( (req, res) => {
    const url = req.url;

    // Setting the type of response to browser, will be a text/html where we can return one html page for example
    res.setHeader('Content-Type', 'text/html');


    if (url === '/') {
        res.write(`<html>
        <head>
            <title>Enter Message</title>
        </head>
        <body>
            <h1>Enter a message:</h1>
            <form action="/message" method="POST">
                <input type="text">
                    <button type="submit">Send</button>
            </form>
        </body>
        </html>`);
        // Here we need to force return, because not, after this line, the others line will execute, and we don't want.
        return res.end();
    }

    res.write(`<html>
    <head>
        <title>Index</title>
    </head>
    <body>
        <h1>Main page running!</h1>
    </body>
    </html>`);

    // Response -> End = Return the response to client
    res.end();
} );

server.listen(3000);