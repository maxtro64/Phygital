import express from 'express';
import { 
  getShopProducts, 
  createProduct, 
  getNearbyProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .post(createProduct);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router.get('/shop/:shopId', getShopProducts);
router.get('/nearby', getNearbyProducts);

export default router;
