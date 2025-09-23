"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartScheama = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    userId: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
    }
});
exports.Cart = (0, mongoose_1.model)('Cart', cartScheama);
