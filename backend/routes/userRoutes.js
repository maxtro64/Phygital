import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile 
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Alias: support /profile/:userId for backwards compatibility
// The :userId param is ignored — the user is determined by the JWT token
router.route('/profile/:userId')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
