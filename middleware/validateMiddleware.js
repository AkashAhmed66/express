const { sendErrorResponse } = require('../utils/responseHandler');

exports.validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return sendErrorResponse(
            res, 
            400, 
            errorMessages.length === 1 ? errorMessages[0] : errorMessages.join('; ')
        );
    }

    next();
};