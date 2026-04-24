import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully to Atlas/Local');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n💡 Troubleshooting Tips:');
    console.log('1. Ensure MongoDB is installed and running.');
    console.log('2. Check if the connection string in server/.env is correct.');
    console.log('3. If using Atlas, ensure your IP address is whitelisted.');
    process.exit(1);
  }
};

export default connectDB;
