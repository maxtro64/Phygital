import express from 'express';
import { getAdminStats, getPendingShops, updateShopStatus } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getAdminStats);
router.get('/pending-shops', getPendingShops);
router.put('/shop/:id/verify', updateShopStatus);

export default router;
