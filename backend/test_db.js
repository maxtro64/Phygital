import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const testConn = async () => {
  try {
    console.log('URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e_commerce');
    console.log('Connected!');
    process.exit(0);
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
};
testConn();
