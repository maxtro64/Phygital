# 🛒 Phygital – Local Commerce Platform

**Empowering local neighborhoods through digital commerce.**

Phygital is a high-performance, full-stack e-commerce application designed to bridge the gap between physical local shops and digital consumers. It allows users to discover nearby stores, browse real-time inventory, and receive lightning-fast deliveries within minutes—all while supporting the local economy.

---

## 🚀 Key Features

### 👤 User Experience
- **Role-Based Authentication**: Specialized workflows for **Users**, **Shopkeepers**, and **System Admins**.
- **Location-Based Discovery**: Automatically detects your location to show the closest shops within a 1km-5km radius.
- **Interactive Shop View**: A Google Maps-style interface for exploring your neighborhood's commerce landscape.
- **Smart Shopping Cart**: Real-time item count, price calculation, and persistent storage using LocalStorage.
- **Order Tracking**: A dynamic, multi-step progress tracker (Placed → Preparing → Out for Delivery → Delivered) with 10-second polling updates.

### 🏪 Shopkeeper & Admin
- **Inventory Management**: Shop owners can manage products, stock levels, and store details.
- **Order Fulfillment**: Dedicated dashboard to accept orders and update delivery status.
- **Admin Oversight**: Centralized panel for verifying new shop registrations and monitoring platform-wide statistics.

### 💳 Payments & Security
- **Hybrid Payment Flow**: Supports both **Cash on Delivery (COD)** and **Online Payments**.
- **Razorpay Integration**: Seamless UPI, Card, and Netbanking integration with a secure checkout flow.
- **JWT Protection**: Secure API endpoints protected by JSON Web Tokens and robust backend middleware.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Framer Motion (for smooth animations)
- **Icons**: Lucide React
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & Bcrypt.js

### APIs & Integrations
- **Payments**: Razorpay API
- **Maps/Location**: Browser Geolocation API
- **Real-time**: Socket.io (ready for live tracking expansion)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (Atlas or Local)
- Razorpay API Keys

### Step 1: Clone the Repository
```bash
git clone https://github.com/maxtro64/phygital-commerce.git
cd phygital-commerce
```

### Step 2: Backend Configuration
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

Run the seeder and start backend:
```bash
node utils/seeder.js
npm start
```

### Step 3: Frontend Configuration
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔄 How It Works (Application Flow)

1. User signs up and logs in  
2. Location permission is requested  
3. Nearby shops are displayed  
4. User selects a shop and browses products  
5. Adds items to cart  
6. Places order (COD or Online Payment)  
7. Order is saved in database  
8. User is redirected to tracking page  
9. Order status updates (Placed → Preparing → Out for Delivery → Delivered)  
10. Orders are stored in user history  

---

## 📸 Screenshots

| Home Page | Shop Discovery | Shopping Cart |
| :---: | :---: | :---: |
| ![Home](https://via.placeholder.com/400x250?text=Home+Page) | ![Shops](https://via.placeholder.com/400x250?text=Nearby+Shops) | ![Cart](https://via.placeholder.com/400x250?text=Smart+Cart) |

---

## 🔮 Future Improvements

- Live Rider Tracking (Real-time map updates)  
- AI-based product recommendations  
- Multi-vendor cart system  
- Mobile app using React Native  

---

## 👨‍💻 Author

**Shivam Yadav**

- GitHub: https://github.com/maxtro64  
- LinkedIn: https://www.linkedin.com/in/shivam-yadav-b87300294/  
- Email: shivam2110207@gmail.com  

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

*Created with ❤️ for the Local Commerce Revolution.*