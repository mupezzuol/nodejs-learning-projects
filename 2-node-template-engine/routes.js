const userService = require('./userService');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        return userService.formCreateUser(req, res);
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        return userService.listUsers(req, res);
    }

    if (url === '/create-user' && method === 'POST') {
        res.setHeader('Content-Type', 'text/html');
        return userService.createUser(req, res);
    }
};

exports.handler = requestHandler;