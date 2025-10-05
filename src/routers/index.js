import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { pingController } from '../controllers/ping.js';
import {
  getFlowersController,
  getFlowersShopController,
} from '../controllers/flowers.js';
import { getCartController } from '../controllers/cart.js';
import { addOrderController, getAllUserOrders } from '../controllers/order.js';
import { createOrderShema } from '../validation/order.js';
// import { isValidId } from '../middlewares/isValidId.js';
import { getShopsController } from '../controllers/shops.js';

const router = Router();
router.get('/', ctrlWrapper(pingController));
router.get('/flowers/:shopName', ctrlWrapper(getFlowersShopController));
router.get('/flowers', ctrlWrapper(getFlowersController));
router.get('/cart', ctrlWrapper(getCartController));
router.get('/order', ctrlWrapper(getAllUserOrders));
router.post(
  '/order',
  validateBody(createOrderShema),
  ctrlWrapper(addOrderController),
);
router.post('/cart', ctrlWrapper(getCartController));
router.get('/shops', ctrlWrapper(getShopsController));

export default router;
