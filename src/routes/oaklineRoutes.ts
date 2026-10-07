import express = require('express');
import { getAllProducts, getProductById } from '../controller/oaklineController';

const router = express.Router();

// oakline routes
router.get('/oakline/get-all-products', getAllProducts);
router.get('/oakline/get-product', getProductById);

export default router;