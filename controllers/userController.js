const User = require('../models/User');
const ApiFeatures = require('../utils/apiFeatures');
const { sendPaginatedResponse, sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

// Create User
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        sendSuccessResponse(res, 201, user);
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
};

// Get All Users with Pagination, Filtering, Search & Sort
exports.getUsers = async (req, res) => {
    try {
        // Get total count for pagination metadata
        const totalUsers = await User.countDocuments();

        // Apply ApiFeatures
        const features = new ApiFeatures(User.find()
                                             .select('-password')
                                             .populate({path: 'role',select: 'name'}), req.query)
            .filter()
            .search(['name', 'email'])
            .sort()
            .limitFields()
            .paginate();

        const users = await features.execute();

        sendPaginatedResponse(res, 200, users, {
            page: features.page,
            limit: features.limit,
            total: totalUsers
        });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Get Single User
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) return sendErrorResponse(res, 404, 'User not found');
        sendSuccessResponse(res, 200, user);
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('role');
        if (!user) return sendErrorResponse(res, 404, 'User not found');
        sendSuccessResponse(res, 200, user);
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return sendErrorResponse(res, 404, 'User not found');
        sendSuccessResponse(res, 200, null, 'User deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// Assign Role
exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { role: roleId },
            { new: true }
        ).populate('role');

        if (!user) return sendErrorResponse(res, 404, 'User not found');
        sendSuccessResponse(res, 200, user);
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};