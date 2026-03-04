const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

const Permission = require('../models/Permission');
const Role = require('../models/Role');
const User = require('../models/User');
const PERMISSIONS = require('../constants/permissions');

dotenv.config();
connectDB();

const seed = async () => {

    await Permission.deleteMany();
    await Role.deleteMany();
    await User.deleteMany();

    // Get all permission values from constants
    const permissionList = Object.values(PERMISSIONS);

    const permissions = await Permission.insertMany(
        permissionList.map(name => ({ name }))
    );

    // Create Super Admin role with ALL permissions
    const superAdminRole = await Role.create({
        name: 'Super Admin',
        permissions: permissions.map(p => p._id)
    });

    // Create User role with only view permissions
    const viewPermissions = permissions.filter(p => p.name.includes('view_'));
    const userRole = await Role.create({
        name: 'User',
        permissions: viewPermissions.map(p => p._id)
    });

    // Create Manager role with view and create permissions
    const managerPermissions = permissions.filter(p => 
        p.name.includes('view_') || p.name.includes('create_') || p.name.includes('update_')
    );
    const managerRole = await Role.create({
        name: 'Manager',
        permissions: managerPermissions.map(p => p._id)
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        age: 30,
        role: superAdminRole._id
    });

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Created:');
    console.log(`   - ${permissions.length} Permissions`);
    console.log('   - 3 Roles (Super Admin, Manager, User)');
    console.log('   - 1 Super Admin User');
    console.log('\n🔑 Super Admin Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('\n🎯 All Permissions:');
    permissionList.forEach(p => console.log(`   - ${p}`));

    process.exit();
};

seed();