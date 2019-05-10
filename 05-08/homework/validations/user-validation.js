const Joi = require('joi');

createSchema = () => {
    return {
        body: {
            username: Joi.string().alphanum().min(6).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        }
    }
};

updateSchema = () => {
    return {
        body: {
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        }
    }
};
module.exports = {
    createSchema,
    updateSchema
};


