"use strict";
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    colors: [{ type: String, required: true }],
    company: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema, 'products');
//# sourceMappingURL=Product.js.map