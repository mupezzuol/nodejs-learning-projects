const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

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
            body.push(chunk);
        });
    
        // End is as a bustop, where we can interact with our chunks
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            // Using writeFile + Callback means we will wait the FS finish their job, and then return response to the client
            fs.writeFile('./node-basics/message.txt', message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/'); // The browser will redirect use to this location, therefore the '/' path
                return res.end();
            });
        });
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
};

// 1. way to export function
// module.exports = requestHandler;

// 2. exporting with a obejct with more functions, const etc...
// module.exports = {
//     handler: requestHandler,
//     someText: 'Testing exporting text'
// };

// 3. Exporting using this way
// module.exports.handler = requestHandler;
// module.exports.someText = 'Testing exporting text';

// 4. exporting just with 'exports' word
exports.handler = requestHandler;
exports.someText = 'Testing exporting text';