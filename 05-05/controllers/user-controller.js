const express = require('express')
    , router = express.Router()
    , constants = require('../commons/constants')
    , userMiddleware = require('../middlewares/user-middleware')
    , userService = require('../services/user-service')
    , User = require('../models/user');

const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

router.post(constants.API_URL.USER_V1, userMiddleware.validateCreateUser, asyncMiddleware(async (req, res, next) => {
    const body = req.body;

    const user = new User(body.username, body.password);
    const result = await userService.create(user);
    return res.json({
        message: 'Create new user succesfully',
        data: result
    });
}));

module.exports = router;
// const ERROR_WENT_WRONG_MESSAGE = 'Something went wrong';
// const ERROR_DATABASE_MESSAGE = 'Database error';
// const ERROR_NOT_FOUND_USER = 'Not found user';

/* 1. POST /api/v1/users
    Create new usre to users.json file
*/
// exports.createUser = async (req, res, next) => {
//     try {
//         const body = req.body;
//         const username = body.username;
//         const password = body.password;
//
//         const newUser = {
//             username: username,
//             password: password
//         };
//
//         // Save in db
//         console.log('->' + db);
//         const result = await db.insertOne(newUser, {'forceServerObjectId': false});
//         return res.json({
//             message: 'Create new user succesfully',
//             data: result.ops
//         });
//     } catch (error) {
//         return next(error);
//     }
// };
//
// /* 2. GET /api/v1/users
//     Get list of user from user.json file
// */
// exports.getListUsers = (req, res, next) => {
//     try {
//         const existingUsers = getExistingUsers(next);
//         return res.json({
//             message: 'List of users',
//             data: existingUsers
//         });
//     } catch (error) {
//         return next(error);
//     }
// };
//
// /* 3. PUT /api/v1/users/:id
//     Update one user by the given userId in users.json file
// */
// exports.updateUser = (req, res, next) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const body = req.body;
//         const username = body.username;
//         const password = body.password;
//         let isChangeValue = false;
//
//         let existingUsers = getExistingUsers();
//         if (!Array.isArray(existingUsers)) {
//             return next(new Error(ERROR_DATABASE_MESSAGE));
//         }
//         const userIndex = findUserIndex(existingUsers, userId);
//         if (userIndex !== -1) {
//             const user = existingUsers[userIndex];
//             if (username) {
//                 user.username = username;
//                 isChangeValue = true;
//             }
//             if (password) {
//                 user.password = password;
//                 isChangeValue = true;
//             }
//             if (isChangeValue) {
//                 saveFile(existingUsers);
//             }
//         } else {
//             return next(new Error(ERROR_NOT_FOUND_USER));
//         }
//
//         return res.json({
//             message: 'Edit user ' + userId + ' succesfully',
//             data: user
//         });
//     } catch (error) {
//         console.error(error);
//         return next(new Error(ERROR_WENT_WRONG_MESSAGE));
//     }
// };
//
// exports.deleteUser = (req, res, next) => {
//     try {
//         const userId = parseInt(req.params.id);
//
//         let existingUsers = getExistingUsers();
//         const userIndex = findUserIndex(existingUsers, userId);
//         if (userIndex !== -1) {
//             existingUsers.splice(userIndex, 1);
//             saveFile(existingUsers);
//         } else {
//             return next(new Error(ERROR_NOT_FOUND_USER));
//         }
//
//         return res.json({
//             message: 'Delete user ' + userId + ' successfully'
//         });
//     } catch (error) {
//         console.error(error);
//         return next(new Error(ERROR_WENT_WRONG_MESSAGE));
//     }
// };
//
// /* 5. GET /api/v1/users/:id
//     Get info of one user by the given userId
// */
// exports.getUserById = (req, res, next) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const existingUsers = getExistingUsers(next);
//         const userIndex = findUserIndex(existingUsers, userId);
//         if (userIndex !== -1) {
//             return res.json({
//                 message: 'Info of user' + userId,
//                 data: existingUsers[userIndex]
//             });
//         } else {
//             return next(new Error(ERROR_NOT_FOUND_USER));
//         }
//     } catch (error) {
//         console.error(error);
//         return next(new Error(ERROR_WENT_WRONG_MESSAGE));
//     }
// };
//
// function findUserIndex(existingUsers, idUser) {
//     return existingUsers.findIndex(item => {
//         return item.id === idUser;
//     });
// }