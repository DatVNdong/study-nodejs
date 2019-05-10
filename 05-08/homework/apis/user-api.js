const validate = require('express-validation');
const validation = require('../validations/user-validation');
const controller = require('../controllers/user-controller');
const resources = require('../commons/resources');
const userRoute = resources.API_URL.USERS_V1;

exports.load = function (app) {
    app.post(userRoute, validate(validation.createSchema()), controller.create); // create new user
    app.get(userRoute, controller.findAll); // find list user
    app.get(`${userRoute}/:id`, validate(validation.findOneSchema()), controller.findOne); // find one user by id
    app.put(`${userRoute}/:id`, validate(validation.updateSchema()), controller.update); // update one user by id
    app.delete(`${userRoute}/:id`, validate(validation.findOneSchema()), controller.remove); // delete one user by id
};
