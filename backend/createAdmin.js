// Create admin user
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@admin.com' });
    if (existing) {
      await User.deleteOne({ email: 'admin@admin.com' });
      console.log('Deleted existing admin user...\n');
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('Admin Login Credentials:');
    console.log('Email: admin@admin.com');
    console.log('Password: admin123\n');
    console.log('Admin Login URL: http://localhost:3000/admin/login\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
