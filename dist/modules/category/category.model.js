"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categoryScheama = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    products: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Product"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Category = (0, mongoose_1.model)('Category', categoryScheama);
