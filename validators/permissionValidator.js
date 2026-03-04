const Joi = require('joi');

exports.createPermissionSchema = Joi.object({
    name: Joi.string().min(3).required()
});