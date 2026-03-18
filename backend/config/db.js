import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/e_commerce');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Make sure your MongoDB service is running (e.g., "net start MongoDB" on Windows) or check your MONGO_URI in .env');
    process.exit(1);
  }
};

export default connectDB;
