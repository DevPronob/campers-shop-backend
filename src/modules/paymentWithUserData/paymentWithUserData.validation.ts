import { z } from "zod";

const paymentValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        address: z.string(),
        phone: z.string(),
        stripePaymentId: z.string()
    })
})

export const paymentValidation = {
    paymentValidationSchema
}