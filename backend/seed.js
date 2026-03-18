import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e_commerce';
    console.log('Connecting to:', uri);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    console.log('Starting Seeding...');
    await connectDB();

    // Clear existing data (CAUTION: don't use in production)
    console.log('Clearing old data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Old data cleared.');
    
    // ... rest of the code ...

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // Create Admin
    await User.create({
      name: 'System Admin',
      email: 'admin@example.com',
      password,
      phone: '1234567890',
      address: 'Admin Office',
      role: 'admin'
    });

    // Create Shopkeepers
    const shops = [
      {
        name: 'John Doe',
        email: 'shop1@example.com',
        password,
        phone: '9876543210',
        address: '123 Market St',
        role: 'shopkeeper',
        shopName: 'Fresh Grocery Hub',
        location: { type: 'Point', coordinates: [77.5946, 12.9716] }, // Bangalore
        isVerified: true,
        verificationStatus: 'Approved'
      },
      {
        name: 'Jane Smith',
        email: 'shop2@example.com',
        password,
        phone: '9876543211',
        address: '456 Pharma Lane',
        role: 'shopkeeper',
        shopName: 'Citizen Pharmacy',
        location: { type: 'Point', coordinates: [77.6000, 12.9800] },
        isVerified: true,
        verificationStatus: 'Approved'
      },
      {
        name: 'Bob Wilson',
        email: 'shop3@example.com',
        password,
        phone: '9876543212',
        address: '789 Electronic Blvd',
        role: 'shopkeeper',
        shopName: 'Tech Gadgets Store',
        location: { type: 'Point', coordinates: [77.6200, 12.9500] },
        isVerified: false,
        verificationStatus: 'Pending'
      }
    ];

    const createdShops = await User.insertMany(shops);

    // Create Products
    const products = [
      {
        shop_id: createdShops[0]._id,
        name: 'Fresh Organic Apples',
        description: 'Sweet and crunchy organic apples from local farms.',
        category: 'Groceries',
        price: 120,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6bccb']
      },
      {
        shop_id: createdShops[0]._id,
        name: 'Farm Fresh Milk',
        description: 'Pure cow milk, delivered fresh every morning.',
        category: 'Dairy',
        price: 60,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1550583724-1255818c053b']
      },
      {
        shop_id: createdShops[1]._id,
        name: 'Paracetamol 500mg',
        description: 'Effective pain relief and fever reducer.',
        category: 'Medicines',
        price: 30,
        stock: 200,
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae']
      },
      {
        shop_id: createdShops[2]._id,
        name: 'Wireless Bluetooth Earbuds',
        description: 'High-quality sound with 20h battery life.',
        category: 'Electronics',
        price: 1999,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df']
      }
    ];

    await Product.insertMany(products);

    // Create regular Users
    await User.create({
      name: 'Alice Cooper',
      email: 'alice@example.com',
      password,
      phone: '8888888888',
      address: '101 Residency Road',
      role: 'user',
      location: { type: 'Point', coordinates: [77.5900, 12.9700] }
    });

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
