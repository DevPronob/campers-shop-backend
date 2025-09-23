"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = void 0;
const zod_1 = require("zod");
const cartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string({
            required_error: "Product Id is Required"
        }),
        quantity: zod_1.z.number({
            required_error: "quantity is Required"
        })
    })
});
exports.cartValidation = {
    cartValidationSchema
};
