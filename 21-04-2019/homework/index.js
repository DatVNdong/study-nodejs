const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const fs = require('fs');
const path = require('path');
const userDataPath = path.resolve('./database');

const ERROR_IS_NOT_NUMBER_MESSAGE = (params) => {
    return params + 'have to be number';
};
const ERROR_FIELD_REQUIRED_MESSAGE = (params) => {
    return params + 'is required field';
};
const ERROR_WENT_WRONG_MESSAGE = 'Something went wrong';
const ERROR_DATABASE_MESSAGE = 'Database error';
const ERROR_NOT_FOUND_USER = 'Not found user';

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

/* Example */
app.get('/say-hello', (req, res, next) => {
    /* Parametter:
        req: Receiving data from client
        res: Return data to client
        next: func() => Error defined, continue request
    */

    /* res.send(): sending data to client. REMEMBER: AFTER USING res.send or res.json or res.render 
        => Cannot use res before this varrible is destroy
        Each req HAS 1 res
    */
    //res.send('Hello Express!')

    return res.status(200).json({
        message: 'hello'
    });

}); // -> this is router - đường dẫn url, trong router có controller

app.put('/api/v1/put-with-json-body', (req, res, next) => {
    try {
        const body = req.body;
        const query = req.query;
        return res.json(body);
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

// Nếu 2 có API trùng nhau thì nó chạy tới cái đầu tiên tìm được, chứ không lỗi
app.get('/same-api', (req, res, next) => {
    return res.json('1');
});
app.get('/same-api', (req, res, next) => {
    return res.json('2');
});

/* 1. POST /api/v1/users 
    Create new usre to users.json file
*/
app.post('/api/v1/users', (req, res, next) => {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        if (!username) {
            return occurredError(res, ERROR_FIELD_REQUIRED_MESSAGE('username'));
        }
        if (!password) {
            return occurredError(res, ERROR_FIELD_REQUIRED_MESSAGE('password'));
        }

        const newUser = {
            username: username,
            password: password
        };

        let existingUsers = getExistingUsers();
        if (!Array.isArray(existingUsers)) {
            return occurredError(res, ERROR_DATABASE_MESSAGE);
        }
        newUser.id = existingUsers.length + 1;
        existingUsers.push(newUser);
        saveFile(existingUsers);

        return res.json({
            message: 'Create new user succesfully',
            data: newUser
        });
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

/* 2. GET /api/v1/users 
    Get list of user from user.json file
*/
app.get('/api/v1/users', (req, res, next) => {
    try {
        let existingUsers = getExistingUsers();
        return res.json({
            message: 'List of users',
            data: existingUsers
        });
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

/* 3. PUT /api/v1/users/:id
    Update one user by the given userId in users.json file
*/
app.put('/api/v1/users/:id', (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return occurredError(res, ERROR_IS_NOT_NUMBER_MESSAGE(userId));
        }
        const body = req.body;
        const username = body.username;
        const password = body.password;
        let isChangeValue = false;

        let existingUsers = getExistingUsers();
        if (!Array.isArray(existingUsers)) {
            return occurredError(res, ERROR_DATABASE_MESSAGE);
        }
        const userIndex = findUserIndex(existingUsers, userId);
        if (userIndex !== -1) {
            const user = existingUsers[userIndex];
            if (username) {
                user.username = username;
                isChangeValue = true;
            }
            if (password) {
                user.password = password;
                isChangeValue = true;
            }
            if (isChangeValue) {
                saveFile(existingUsers);
            }
        } else {
            return occurredError(res, ERROR_NOT_FOUND_USER);
        }

        return res.json({
            message: 'Edit user ' + userId + ' succesfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

/* 4. DELETE /api/v1/users/:id
    Delete one user by the given userId in users.json file
*/
app.delete('/api/v1/users/:id', (req, res, next) => {
    try {
        const params = req.params;
        const userId = parseInt(params.id);
        if (isNaN(userId)) {
            return occurredError(res, ERROR_IS_NOT_NUMBER_MESSAGE(userId));
        }

        let existingUsers = getExistingUsers();
        const userIndex = findUserIndex(existingUsers, userId);
        if (userIndex !== -1) {
            existingUsers.splice(userIndex, 1);
            saveFile(existingUsers);
        } else {
            return occurredError(res, ERROR_NOT_FOUND_USER);
        }

        return res.json({
            message: 'Delete user ' + userId + ' successfully'
        });
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

/* 5. GET /api/v1/users/:id
    Get info of one user by the given userId
*/
app.get('/api/v1/users/:id', (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return occurredError(res, ERROR_IS_NOT_NUMBER_MESSAGE(userId));
        }

        const existingUsers = getExistingUsers();
        const userIndex = findUserIndex(existingUsers, userId);
        if (userIndex !== -1) {
            return res.json({
                message: 'Info of user' + userId,
                data: existingUsers[userIndex]
            });
        } else {
            return occurredError(res, ERROR_NOT_FOUND_USER);
        }
    } catch (error) {
        console.error(error);
        occurredError(res, ERROR_WENT_WRONG_MESSAGE);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function occurredError(res, message) {
    return res.status(400).json({
        error: message,
    });
}

function getExistingUsers() {
    let existingUsers = fs.readFileSync(userDataPath + '/users.json', 'utf8');
    existingUsers = !existingUsers ? [] : JSON.parse(existingUsers);
    return existingUsers;
}

function findUserIndex(existingUsers, idUser) {
    return existingUsers.findIndex(item => {
        return item.id === idUser;
    });
}

function saveFile(users) {
    fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(users));
}