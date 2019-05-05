const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , configs = require('./configs/configs')
    , userController = require('./controllers/user-controller');

app.use(bodyParser.json({type: configs["APP_CONFIG"].BODY_PARSE_TYPE}));

app.use(require('./middlewares/user-middleware'));
app.use(require('./controllers/user-controller'));
app.use(function (err, req, res, next) {
    console.log('--> Having error');
    return res.status(400).json({
        message: err.message,
        // Muốn trả error ra cho người dùng từ res.json thì dùng error.stack hoặc stringify
        error: err.stack
    });
});
// Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }
//     console.log("Connected successfully to server");
//
//     const db = client.db(dbName);
//     app.use(function (req, res, next) { // global middleware
//         req.db = db;
//         return next();
//     });
//
//     // Nếu không bỏ các router ở đây mà bỏ ở ngoài thì các req sẽ không đi qua global middleware và db sẽ ko được gán vì bất đồng bộ
//     app.post('/api/v1/users', userMiddleware.validateCreateUser, userController.createUser);
//     app.get('/api/v1/users', userController.getListUsers);
//     app.put('/api/v1/users/:id', userMiddleware.validateUserId, userController.updateUser);
//     app.delete('/api/v1/users/:id', userMiddleware.validateUserId, userController.deleteUser);
//     app.get('/api/v1/users/:id', userMiddleware.validateUserId, userController.getUserById);
//
//     app.use(function (err, req, res, next) {
//         console.log('--> Having error');
//         return res.status(400).json({
//             message: err.message,
//             // Muốn trả error ra cho người dùng từ res.json thì dùng error.stack hoặc stringify
//             error: err.stack
//         });
//     });
//     // client.close();
// });

app.listen(configs["APP_CONFIG"].PORT, () => console.log(`Listening on port ${configs["APP_CONFIG"].PORT}!`));