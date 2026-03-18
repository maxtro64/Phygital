import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getShopOrders,
  updateOrderStatus,
  assignDeliveryBoy
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/user').get(protect, getMyOrders);
router.route('/myorders/:userId').get(protect, getMyOrders);
router.route('/shoporders/:shopId').get(protect, getShopOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, updateOrderStatus);
router.route('/:id/assign').put(protect, assignDeliveryBoy);

export default router;
