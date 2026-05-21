"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        cartId: zod_1.z.string(),
        paymentId: zod_1.z.string().optional(),
        userId: zod_1.z.string(),
        status: zod_1.z.string(),
    }),
});
exports.orderValidation = {
    createOrderValidationSchema,
};
