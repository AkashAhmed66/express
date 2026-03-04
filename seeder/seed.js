const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const Permission = require('./models/Permission');
const Role = require('./models/Role');
const User = require('./models/User');

dotenv.config();
connectDB();

const seed = async () => {

    await Permission.deleteMany();
    await Role.deleteMany();
    await User.deleteMany();

    const permissionList = [
        'create_user',
        'delete_user',
        'view_dashboard',
        'manage_roles',
        'manage_permissions'
    ];

    const permissions = await Permission.insertMany(
        permissionList.map(name => ({ name }))
    );

    const adminRole = await Role.create({
        name: 'admin',
        permissions: permissions.map(p => p._id)
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: adminRole._id
    });

    console.log("Admin created:");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");

    process.exit();
};

seed();