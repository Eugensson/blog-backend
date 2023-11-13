const Joi = require("joi");

const addSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

module.exports = {
    addSchema,
};