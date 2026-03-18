import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  try {
    const {
      user_id,
      shop_id,
      products,
      payment_method,
      payment_status,
      total_amount,
      delivery_address,
      phone
    } = req.body;

    // 1. Verify Stock for all items
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${dbProduct.name}. Only ${dbProduct.stock} units left.` 
        });
      }
    }

    const order = new Order({
      user_id,
      shop_id,
      products: products.map(p => ({
        product: p.product,
        name: p.name || 'Product', // Store snapshot
        price: p.price,
        quantity: p.quantity
      })),
      payment_method,
      payment_status: payment_status || 'Pending',
      total_amount,
      delivery_address,
      phone,
      delivery_status: 'Placed'
    });

    const createdOrder = await order.save();

    // 2. Decrement Stock after successful order
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      orderId: createdOrder._id,
      ...createdOrder._doc
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user_id', 'name email address phone')
      .populate('shop_id', 'shopName address');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/user
// @route   GET /api/orders/myorders/:userId
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.params.userId;
    const orders = await Order.find({ user_id: userId })
      .populate('shop_id', 'shopName address')
      .populate('products.product', 'name image price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get shopkeeper orders
// @route   GET /api/orders/shoporders/:shopId
export const getShopOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shop_id: req.params.shopId })
      .populate('user_id', 'name phone address')
      .populate('products.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Shopkeeper
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, payment_status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (status) order.delivery_status = status;
      if (payment_status) order.payment_status = payment_status;
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign delivery boy to order
// @route   PUT /api/orders/:id/assign
export const assignDeliveryBoy = async (req, res) => {
  try {
    const { delivery_boy_id } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.delivery_boy_id = delivery_boy_id;
      order.delivery_status = 'Accepted';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
