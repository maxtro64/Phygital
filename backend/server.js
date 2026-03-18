// server.js
import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { Server } from 'socket.io';

// Connect Database (need to import db.js)
import connectDB from './config/db.js';
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Razorpay Payment Server is running',
    timestamp: new Date().toISOString()
  });
});

// Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, orderId, currency = 'INR' } = req.body;
    
    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and orderId are required'
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency,
      receipt: `receipt_${orderId}`,
      notes: {
        order_id: orderId,
        description: `Payment for order ${orderId} from LocalShop`
      },
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
        notes: order.notes
      }
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Create UPI QR Code
app.post('/api/create-qr', async (req, res) => {
  try {
    const { name, amount, orderId, customer_id = 'cust_local_shop' } = req.body;
    
    if (!name || !amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Name, amount and orderId are required'
      });
    }

    const qrOptions = {
      type: "upi_qr",
      name: name,
      usage: "single_use",
      fixed_amount: true,
      payment_amount: Math.round(amount * 100),
      description: `QR for order ${orderId}`,
      customer_id: customer_id,
      close_by: Math.floor(Date.now() / 1000) + 600, // 10 minutes expiry
      notes: {
        order_id: orderId
      }
    };

    const qrCode = await razorpay.qrCode.create(qrOptions);
    
    res.status(200).json({
      success: true,
      qrCode: {
        id: qrCode.id,
        image_url: qrCode.image_url,
        payment_amount: qrCode.payment_amount,
        status: qrCode.status,
        created_at: qrCode.created_at
      }
    });
    
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create QR code',
      error: error.message
    });
  }
});

// Verify Payment Signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification data is required'
      });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      res.status(200).json({
        success: true,
        message: 'Payment signature verified successfully',
        data: {
          razorpay_order_id,
          razorpay_payment_id,
          is_authentic: true
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment signature verification failed',
        data: {
          razorpay_order_id,
          razorpay_payment_id,
          is_authentic: false
        }
      });
    }
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
});

// Get Payment Details
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required'
      });
    }

    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        order_id: payment.order_id,
        description: payment.description,
        email: payment.email,
        contact: payment.contact,
        notes: payment.notes,
        created_at: payment.created_at,
        captured_at: payment.captured_at
      }
    });
    
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
});

// Get Order Details
app.get('/api/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const order = await razorpay.orders.fetch(orderId);
    
    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        attempts: order.attempts,
        notes: order.notes,
        created_at: order.created_at
      }
    });
    
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
});

// Refund Payment
app.post('/api/refund', async (req, res) => {
  try {
    const { paymentId, amount, notes = {} } = req.body;
    
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required'
      });
    }

    const refundOptions = {
      amount: amount ? Math.round(amount * 100) : undefined,
      notes: notes
    };

    const refund = await razorpay.payments.refund(paymentId, refundOptions);
    
    res.status(200).json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        payment_id: refund.payment_id,
        notes: refund.notes,
        status: refund.status,
        created_at: refund.created_at
      }
    });
    
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund',
      error: error.message
    });
  }
});

// Webhook Handler (For production)
app.post('/api/webhook', (req, res) => {
  try {
    const webhookBody = req.body;
    const webhookSignature = req.headers['x-razorpay-signature'];
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
      .update(JSON.stringify(webhookBody))
      .digest('hex');
    
    if (webhookSignature !== expectedSignature) {
      console.warn('Invalid webhook signature');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
    
    const event = webhookBody.event;
    const payload = webhookBody.payload;
    
    console.log(`Webhook received: ${event}`);
    
    // Handle different webhook events
    switch (event) {
      case 'payment.authorized':
        console.log('Payment authorized:', payload.payment.entity.id);
        // Handle payment authorization
        break;
        
      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity.id);
        // Handle successful payment
        break;
        
      case 'payment.failed':
        console.log('Payment failed:', payload.payment.entity.id);
        // Handle failed payment
        break;
        
      case 'order.paid':
        console.log('Order paid:', payload.order.entity.id);
        // Handle order completion
        break;
        
      default:
        console.log('Unhandled webhook event:', event);
    }
    
    res.status(200).json({ success: true, message: 'Webhook received' });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process webhook',
      error: error.message
    });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(`🔥 Global Error: [${req.method}] ${req.path} -> ${err.message}`);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
  📍 Port: ${PORT}
  🔗 Local: http://localhost:${PORT}
  🔗 Health: http://localhost:${PORT}/api/health
  💳 Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID?.substring(0, 8)}...
  `);
});

// Setup Socket.io for Real-time Tracking
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('User connected via Socket.io:', socket.id);
  
  socket.on('join_order_room', (orderId) => {
    socket.join(orderId);
    console.log(`User joined socket room for order: ${orderId}`);
  });
  
  // Real-time status emission wrapper
  socket.on('update_order_status', (data) => {
    io.to(data.orderId).emit('status_updated', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;