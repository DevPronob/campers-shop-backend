"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String, required: true },
    ratings: { type: Number, required: true },
    imageUrls: { type: [String] },
    stock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Product = (0, mongoose_1.model)('Product', productModel);
