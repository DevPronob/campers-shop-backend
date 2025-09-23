import { z } from "zod";

const productsValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is Required"
        }),
        price: z.number(
            {
                required_error: "Price is Required",
                invalid_type_error: "Price is required as number"
            }
        ).positive(),
        stock: z.number(
            {
                required_error: "Stock is Required",

            }
        ).int().nonnegative(),
        description: z.string({
            required_error: "Description is Required",
        }),
        category: z.string(),
        ratings: z.number().min(0).max(5),
        imageUrls: z.array(z.string().url())
    }),
    isFeatured: z.boolean().optional(),
    isBestSelling: z.boolean().optional(),
})

export const productValidation = {
    productsValidationSchema
}
