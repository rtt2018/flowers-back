import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { pingController } from '../controllers/ping.js';
import { getFlowersController } from '../controllers/flowers.js';
import { getCartController } from '../controllers/cart.js';
import { addOrderController } from '../controllers/order.js';

const router = Router();
router.get('/', ctrlWrapper(pingController));
router.get('/flowers', ctrlWrapper(getFlowersController));
router.get('/cart', ctrlWrapper(getCartController));
router.post('/order', validateBody, ctrlWrapper(addOrderController));
router.post('/cart', ctrlWrapper(getCartController));

export default router;
