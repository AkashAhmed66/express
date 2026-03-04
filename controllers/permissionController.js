const Permission = require('../models/Permission');

// Create Permission
exports.createPermission = async (req, res) => {
    const permission = await Permission.create({
        name: req.body.name
    });
    res.status(201).json(permission);
};

// Get All
exports.getPermissions = async (req, res) => {
    const permissions = await Permission.find();
    res.json(permissions);
};

// Delete
exports.deletePermission = async (req, res) => {
    await Permission.findByIdAndDelete(req.params.id);
    res.json({ message: "Permission deleted" });
};