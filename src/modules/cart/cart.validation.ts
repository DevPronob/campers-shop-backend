import { z } from "zod";

const cartValidationSchema = z.object({
    body: z.object({
        productId: z.string({
            required_error: "Product Id is Required"
        }),
        quantity: z.number({
            required_error: "quantity is Required"
        })
    })
})

export const cartValidation = {
    cartValidationSchema
}
