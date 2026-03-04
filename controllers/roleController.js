const Role = require('../models/Role');
const Permission = require('../models/Permission');

// Create Role
exports.createRole = async (req, res) => {
    const { name, permissions } = req.body;

    const role = await Role.create({
        name,
        permissions
    });

    res.status(201).json(role);
};

// Get All Roles
exports.getRoles = async (req, res) => {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
};

// Update Role Permissions
exports.updateRolePermissions = async (req, res) => {
    const role = await Role.findByIdAndUpdate(
        req.params.id,
        { permissions: req.body.permissions },
        { new: true }
    );

    res.json(role);
};

// Delete Role
exports.deleteRole = async (req, res) => {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
};