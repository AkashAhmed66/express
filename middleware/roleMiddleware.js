const { sendErrorResponse } = require('../utils/responseHandler');

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return sendErrorResponse(res, 401, 'User not authenticated');
        }

        if (!roles.includes(req.user.role.name)) {
            return sendErrorResponse(
                res, 
                403, 
                `Access denied. Required roles: ${roles.join(', ')}`
            );
        }
        next();
    };
};