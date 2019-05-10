const validate = require('express-validation');
const userValidation = require('../validations/user-validation');
const userController = require('../controllers/user-controller');
const resources = require('../commons/resources');
const userRoute = resources.API_URL.USER_V1;

exports.load = function (app) {
    app.post(userRoute, validate(userValidation.createSchema()), userController.create); // create new user
    app.get(userRoute, userController.findAll); // find list user
    app.get(`${userRoute}/:id`, userController.findOne); // find one user by id
    app.put(`${userRoute}/:id`, validate(userValidation.updateSchema()), userController.update); // update one user by id
    app.delete(`${userRoute}/:id`, userController.remove); // delete one user by id
};
