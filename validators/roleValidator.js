const Joi = require('joi');

exports.createRoleSchema = Joi.object({
    name: Joi.string().min(3).required(),

    permissions: Joi.array()
        .items(Joi.string().hex().length(24))
        .required()
});