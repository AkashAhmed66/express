const Joi = require('joi');

exports.assignRoleSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    roleId: Joi.string().hex().length(24).required()
});