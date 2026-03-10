const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://srikanth0598_db_user:8Tetmovy0oebBxpi@cluster0.j9f2y91.mongodb.net/?appName=Cluster0' );
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;