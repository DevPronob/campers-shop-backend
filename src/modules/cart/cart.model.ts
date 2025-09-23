import { model, Schema } from "mongoose"
import { TCart } from "./cart.interface"



const cartScheama = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    userId:{
        type:String
    },
    quantity: {
        type: Number,
        required: true,
    }

})

export const Cart = model<TCart>('Cart', cartScheama)