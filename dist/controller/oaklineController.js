"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = void 0;
const Product = require("../models/oakline/Product");
const getAllProducts = async (req, res) => {
    console.log('get all products @ oakline called');
    try {
        const all_products = await Product.find();
        console.log(all_products);
        res.status(200).json(all_products);
    }
    catch (err) {
        console.error('ERROR ENCOUNTERED', err);
        res.status(500).send('SERVER ERROR @ OAKLINE GET ALL PRODUCTS');
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const prod_id = req.query.id;
        if (typeof prod_id !== 'string') {
            res.status(400).send('Missing or invalid product ID');
            return;
        }
        const product = await Product.findById(prod_id);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.json(product);
    }
    catch (err) {
        console.error('ERROR ENCOUNTERED', err);
        res.status(500).send('SERVER ERROR @ OAKLINE GET PRODUCT BY ID');
    }
};
exports.getProductById = getProductById;
//# sourceMappingURL=oaklineController.js.map