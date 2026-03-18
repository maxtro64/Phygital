import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const dummyShops = [
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d0",
    name: "Fresh Mart Grocery",
    category: "Groceries",
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d1",
    name: "Citizen Pharmacy",
    category: "Medicines",
    location: { lat: 28.6145, lng: 77.2105 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d2",
    name: "Green Valley Fruits",
    category: "Fruits & Vegetables",
    location: { lat: 28.6120, lng: 77.2080 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d3",
    name: "Tech Hub Electronics",
    category: "Electronics",
    location: { lat: 28.6160, lng: 77.2120 }
  }
];

const dummyProducts = [
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d0",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d0",
    name: "Organic Bananas",
    price: 60,
    category: "Fruits",
    stock: 50,
    image: "https://images.unsplash.com/photo-1603833665858-e81b1c7e4460?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d1",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d0",
    name: "Fresh Whole Milk",
    price: 35,
    category: "Dairy",
    stock: 100,
    image: "https://images.unsplash.com/photo-1563636619-e9107da5a76a?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d2",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d1",
    name: "Paracetamol 500mg",
    price: 25,
    category: "Medicines",
    stock: 200,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d3",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d2",
    name: "Red Seedless Grapes",
    price: 120,
    category: "Fruits",
    stock: 30,
    image: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d4",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d3",
    name: "Wireless Mouse",
    price: 499,
    category: "Electronics",
    stock: 15,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=200"
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to DB with URI:', process.env.MONGO_URI);
    await connectDB();
    console.log('Seeding process started...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Seed Shops
    for (const shop of dummyShops) {
      const existingShop = await User.findById(shop.id);
      if (!existingShop) {
        await User.create({
          _id: shop.id,
          name: `${shop.name} Owner`,
          email: `${shop.name.toLowerCase().replace(/ /g, '')}@example.com`,
          password: hashedPassword,
          phone: `910000000${dummyShops.indexOf(shop)}`,
          address: 'Market Street, City Center',
          role: 'shopkeeper',
          shopName: shop.name,
          isVerified: true,
          verificationStatus: 'Approved',
          location: {
            type: 'Point',
            coordinates: [shop.location.lng, shop.location.lat]
          }
        });
        console.log(`✅ Created shop: ${shop.name}`);
      } else {
        console.log(`ℹ️ Shop already exists: ${shop.name}`);
      }
    }

    // Seed Products
    for (const prod of dummyProducts) {
      const existingProd = await Product.findById(prod.id);
      if (!existingProd) {
        await Product.create({
          _id: prod.id,
          shop_id: prod.shopId,
          name: prod.name,
          category: prod.category,
          price: prod.price,
          stock: prod.stock,
          images: [prod.image]
        });
        console.log(`✅ Created product: ${prod.name}`);
      } else {
        console.log(`ℹ️ Product already exists: ${prod.name}`);
      }
    }

    console.log('🚀 Database seeded successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
