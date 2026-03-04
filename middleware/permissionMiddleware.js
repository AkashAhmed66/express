const { sendErrorResponse } = require('../utils/responseHandler');

exports.authorizePermissions = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return sendErrorResponse(res, 401, 'User not authenticated');
        }

        if (!req.user.role.permissions) {
            return sendErrorResponse(res, 403, 'No permissions assigned to user role');
        }

        const userPermissions = req.user.role.permissions.map(p => p.name);

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return sendErrorResponse(
                res, 
                403, 
                `Access denied. Required permissions: ${requiredPermissions.join(', ')}`
            );
        }

        next();
    };
};