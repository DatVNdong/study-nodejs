const Joi = require('joi');
const condition = {
    name: Joi.string().alphanum().min(3).max(40).required(),
    _id: Joi.string().hex().length(24).required(),
    price: Joi.number().integer().positive().required(),
    colors: Joi.array().items(Joi.string().required()).required(),
    isAvailable: Joi.boolean().required(),
    payload: Joi.object().keys({
        releasedAt: Joi.date().min('now').required(),
        expiredAt: Joi.date().greater(Joi.ref('releasedAt')).required()
    }).required()
};

createSchema = () => {
    return {
        body: {
            name: condition.name,
            userId: condition._id,
            price: condition.price,
            colors: condition.colors,
            isAvailable: condition.isAvailable,
            payload: condition.payload
        }
    };
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
            price: condition.price,
            colors: condition.colors,
            isAvailable: condition.isAvailable,
            payload: condition.payload
        }
    };
};

module.exports = {
    createSchema,
    findOneSchema,
    updateSchema
};