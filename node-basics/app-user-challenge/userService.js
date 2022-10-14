const fs = require('node:fs');

const userFileFullPath = './node-basics/app-user-challenge/users.txt';

const listUsers = (req, res) => {
    res.write('<html>');
    res.write('<head><title>List of Users</title></head>');
    res.write('<body>');
    res.write(`
        <h1>List of User</h1>
        <p>Below you can check the list of users created!</p>`
        );

    var listOfUsersArray = fs.readFileSync(userFileFullPath, 'utf-8').toString().split('\n');
    var listOfUsersArrayInvalid = listOfUsersArray.length === 0 || listOfUsersArray[0] === '';
    if (listOfUsersArrayInvalid)
    {
        console.log('No users found!');
        res.write('<p>We can not find users!</p>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    res.write(`<ul>`);
    for(i in listOfUsersArray) {
        const containUser = listOfUsersArray[i] != '';
        if (containUser)
        {
            res.write(`<li>${listOfUsersArray[i]}</li>`);
        }
    }
    res.write(`</ul>`);
    res.write('</body>');
    res.write('</html>');
    return res.end();
};

const formCreateUser = (req, res) => {
    res.write('<html>');
    res.write('<head><title>Create User</title></head>');
    res.write(
        `<body>
            <h1>Create User</h1>
            <p>Type a new username and click on the button!</p>
            <form action="/create-user" method="POST">
                <label for="fUsername">Username:</label><br>
                <input type="text" name="fUsername" id="fUsername"><br><br>
                <button type="submit">Send</button>
            </form>
        </body>`
        );
    res.write('</html>');
    return res.end();
};

const createUser = (req, res) => {
    console.log('Creating User...')
    const body = [];
    
    req.on('data', chunk => {
        body.push(chunk);
    });
    
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const spaceString = '\n';
        const fUsername = parsedBody.split('=')[1];
        const usernameWithSpace = fUsername + spaceString;

        fs.appendFile(userFileFullPath, usernameWithSpace, 'utf8', function (error) {
            if (error) throw error;

            res.statusCode = 302;
            res.setHeader('Location', '/'); // The browser will redirect use to this location, therefore the '/' path
            return res.end();
          });
    });
    // We are not using the code belo, because the code can be executed it before our FS, 
    // therefore we are making sure FS will execute first and then return response
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    // res.end();
};

module.exports = {
    listUsers: listUsers,
    formCreateUser: formCreateUser,
    createUser: createUser
};