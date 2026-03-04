const Permission = require('../models/Permission');
const ApiFeatures = require('../utils/apiFeatures');
const { sendPaginatedResponse, sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

// Create Permission
exports.createPermission = async (req, res) => {
    try {
        const permission = await Permission.create({
            name: req.body.name
        });
        sendSuccessResponse(res, 201, permission);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
};

// Get All Permissions with Pagination, Filtering, Search & Sort
exports.getPermissions = async (req, res) => {
    try {
        // Get total count for pagination metadata
        const totalPermissions = await Permission.countDocuments();

        // Apply ApiFeatures
        const features = new ApiFeatures(Permission.find(), req.query)
            .filter()
            .search(['name'])
            .sort()
            .limitFields()
            .paginate();

        const permissions = await features.execute();

        sendPaginatedResponse(res, 200, permissions, {
            page: features.page,
            limit: features.limit,
            total: totalPermissions
        });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Delete
exports.deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findByIdAndDelete(req.params.id);
        if (!permission) return sendErrorResponse(res, 404, 'Permission not found');
        sendSuccessResponse(res, 200, null, 'Permission deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};