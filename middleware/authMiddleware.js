const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendErrorResponse } = require('../utils/responseHandler');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
        return sendErrorResponse(res, 401, 'Not authorized, no token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id)
            .populate({
                path: 'role',
                populate: {
                    path: 'permissions'
                }
            })
            .select('-password');

        if (!req.user)
            return sendErrorResponse(res, 401, 'User not found');

        next();
    } catch (error) {
        sendErrorResponse(res, 401, 'Not authorized, token failed');
    }
};