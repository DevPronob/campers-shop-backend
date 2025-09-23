"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is Required"
        }),
        price: zod_1.z.number({
            required_error: "Price is Required",
            invalid_type_error: "Price is required as number"
        }).positive(),
        stock: zod_1.z.number({
            required_error: "Stock is Required",
        }).int().nonnegative(),
        description: zod_1.z.string({
            required_error: "Description is Required",
        }),
        category: zod_1.z.string(),
        ratings: zod_1.z.number().min(0).max(5),
        imageUrls: zod_1.z.array(zod_1.z.string().url())
    }),
    isFeatured: zod_1.z.boolean().optional(),
    isBestSelling: zod_1.z.boolean().optional(),
});
exports.productValidation = {
    productsValidationSchema
};
