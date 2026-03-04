exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role.name)) {
            return res.status(403).json({
                message: "Access denied (Role)"
            });
        }
        next();
    };
};