import { z } from "zod";

const createOrderValidationSchema = z.object({
    body: z.object({
        cartId: z.string(),
        paymentId: z.string().optional(),
        userId: z.string(),
        status: z.string(),
    }),
})


export const orderValidation ={
    createOrderValidationSchema,
}