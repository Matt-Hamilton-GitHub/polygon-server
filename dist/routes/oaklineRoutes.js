"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const oaklineController_1 = require("../controller/oaklineController");
const router = express.Router();
// oakline routes
router.get('/oakline/get-all-products', oaklineController_1.getAllProducts);
router.get('/oakline/get-product', oaklineController_1.getProductById);
exports.default = router;
//# sourceMappingURL=oaklineRoutes.js.map