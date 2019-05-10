const Joi = require('joi');
const condition = {
    _id: Joi.string().hex().length(24).required(),
    username: Joi.string().alphanum().min(6).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
};

createSchema = () => {
    return {
        body: {
            username: condition.username,
            password: condition.password
        }
    }
};

findOneSchema = () => {
    return {
        params: {
            id: condition._id
        }
    };
};

updateSchema = () => {
    return {
        params: {
            id: condition._id
        },
        body: {
            password: condition.password
        }
    }
};

module.exports = {
    createSchema,
    findOneSchema,
    updateSchema
};


