require('dotenv').config();
const mongoose = require('mongoose');

const resetDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.dropDatabase();
    console.log('Database reset successful');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetDatabase();