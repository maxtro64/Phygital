import express from 'express';
import {
  registerDeliveryBoy,
  getDeliveryBoys,
  getDeliveryBoyById,
  updateDeliveryBoyStatus
} from '../controllers/deliveryController.js';

const router = express.Router();

router.route('/')
  .post(registerDeliveryBoy)
  .get(getDeliveryBoys);

router.route('/:id')
  .get(getDeliveryBoyById);

router.route('/:id/status')
  .put(updateDeliveryBoyStatus);

export default router;
