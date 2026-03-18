import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Get Admin Sales Statistics
// @route   GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalShops = await User.countDocuments({ role: 'shopkeeper' });
    
    const orders = await Order.find({});
    // Calculate total revenue from all orders
    const totalRevenue = orders.reduce((acc, order) => acc + (order.total_amount || 0), 0);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalShops,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all pending shops
// @route   GET /api/admin/pending-shops
export const getPendingShops = async (req, res) => {
  try {
    const shops = await User.find({ role: 'shopkeeper', verificationStatus: 'Pending' });
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve/Reject Shop
// @route   PUT /api/admin/shop/:id/verify
export const updateShopStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const shop = await User.findOne({ _id: req.params.id, role: 'shopkeeper' });
    
    if (shop) {
      shop.verificationStatus = status;
      shop.isVerified = status === 'Approved';
      await shop.save();
      res.json({ success: true, message: `Shop ${status}` });
    } else {
      res.status(404).json({ success: false, message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
