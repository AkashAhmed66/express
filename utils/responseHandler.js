/**
 * Send paginated response with metadata
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Array} data - Array of data to send
 * @param {Object} pagination - Pagination metadata
 */
exports.sendPaginatedResponse = (res, statusCode, data, pagination) => {
    res.status(statusCode).json({
        success: true,
        count: data.length,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            totalPages: Math.ceil(pagination.total / pagination.limit)
        },
        data
    });
};

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {*} data - Data to send
 * @param {String} message - Optional message
 */
exports.sendSuccessResponse = (res, statusCode, data, message = null) => {
    const response = {
        success: true
    };
    
    if (message) response.message = message;
    if (data !== undefined) response.data = data;
    
    res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 */
exports.sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        error: message
    });
};
