const Role = require('../models/Role');
const Permission = require('../models/Permission');
const ApiFeatures = require('../utils/apiFeatures');
const { sendPaginatedResponse, sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

// Create Role
exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const role = await Role.create({
            name,
            permissions
        });

        sendSuccessResponse(res, 201, role);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
};

// Get All Roles with Pagination, Filtering, Search & Sort
exports.getRoles = async (req, res) => {
    try {
        // Get total count for pagination metadata
        const totalRoles = await Role.countDocuments();

        // Apply ApiFeatures
        const features = new ApiFeatures(Role.find().populate('permissions'), req.query)
            .filter()
            .search(['name']) 
            .sort()
            .limitFields()
            .paginate();

        const roles = await features.execute();

        sendPaginatedResponse(res, 200, roles, {
            page: features.page,
            limit: features.limit,
            total: totalRoles
        });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Update Role Permissions
exports.updateRolePermissions = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { permissions: req.body.permissions },
            { new: true, runValidators: true }
        ).populate('permissions');

        if (!role) return sendErrorResponse(res, 404, 'Role not found');
        sendSuccessResponse(res, 200, role);
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Delete Role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return sendErrorResponse(res, 404, 'Role not found');
        sendSuccessResponse(res, 200, null, 'Role deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};