const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const userController = require('./controllers/user-controller');
const userMiddleware = require('./middlewares/user-middleware');

app.use(bodyParser.json({ type: 'application/json' }));

/* 1. POST /api/v1/users 
    Create new usre to users.json file
*/
app.post('/api/v1/users', userMiddleware.validateCreateUser, userController.createUser);

/* 2. GET /api/v1/users 
    Get list of user from user.json file
*/
app.get('/api/v1/users', userController.getListUsers);

/* 3. PUT /api/v1/users/:id
    Update one user by the given userId in users.json file
*/
app.put('/api/v1/users/:id', userMiddleware.validateUserId, userController.updateUser);

/* 4. DELETE /api/v1/users/:id
    Delete one user by the given userId in users.json file
*/
app.delete('/api/v1/users/:id', userMiddleware.validateUserId, userController.deleteUser);

/* 5. GET /api/v1/users/:id
    Get info of one user by the given userId
*/
app.get('/api/v1/users/:id', userMiddleware.validateUserId, userController.getUserById);

app.use(function (err, req, res, next) {
    console.log('--> Having error');
    return res.status(400).json({
        message: err.message,
        // Muốn trả error ra cho người dùng từ res.json thì dùng error.stack hoặc stringify
        error: err.stack
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));