const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    console.log('get users called ', req);
    const users = await User.find();
    res.json(users);
};

// Get Single User
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

// Update User
exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.json(user);
};

// Delete User
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};

// Assign Role
exports.assignRole = async (req, res) => {
    const { userId, roleId } = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        { role: roleId },
        { new: true }
    ).populate('role');

    res.json(user);
};