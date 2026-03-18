import DeliveryBoy from '../models/DeliveryBoy.js';
import Order from '../models/Order.js';

// @desc    Register a new delivery boy
// @route   POST /api/delivery
export const registerDeliveryBoy = async (req, res) => {
  try {
    const { name, contact } = req.body;
    
    const deliveryBoyExists = await DeliveryBoy.findOne({ contact });
    if (deliveryBoyExists) {
      return res.status(400).json({ message: 'Delivery boy already exists' });
    }

    const deliveryBoy = await DeliveryBoy.create({
      name,
      contact
    });

    res.status(201).json(deliveryBoy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all delivery boys
// @route   GET /api/delivery
export const getDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find({});
    res.json(deliveryBoys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get delivery boy by ID
// @route   GET /api/delivery/:id
export const getDeliveryBoyById = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id).populate('assigned_orders');
    
    if (deliveryBoy) {
      res.json(deliveryBoy);
    } else {
      res.status(404).json({ message: 'Delivery boy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update delivery boy status
// @route   PUT /api/delivery/:id/status
export const updateDeliveryBoyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);

    if (deliveryBoy) {
      deliveryBoy.status = status;
      const updatedDeliveryBoy = await deliveryBoy.save();
      res.json(updatedDeliveryBoy);
    } else {
      res.status(404).json({ message: 'Delivery boy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
