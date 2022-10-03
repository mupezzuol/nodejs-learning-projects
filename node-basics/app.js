const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;

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
                <input type="text" name="message">
                    <button type="submit">Send</button>
            </form>
        </body>
        </html>`);
        // Here we need to force return, because not, after this line, the others line will execute, and we don't want.
        return res.end();
    }

    if (url === '/message' && method === 'POST' ) {
        const body = [];

        // Request + ON = Event Listener about data chunks.... until to be ready
        // data is what is comming, like a chunks... piece of piece
        req.on('data', (chunk) =>{
            console.log('chunk: ');
            console.log(chunk);
            body.push(chunk);
        });

        // End is as a bustop, where we can interact with our chunks
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody: ');
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('./node-basics/message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/'); // The browser will redirect use to this location, therefore the '/' path
        return res.end();
    };

    res.write(`<html>
    <head>
        <title>Index</title>
    </head>
    <body>
        <h1>Main Page</h1>
    </body>
    </html>`);
    // Here we need to force return, because not, after this line, the others line will execute, and we don't want.
    return res.end();
} );

server.listen(3000);