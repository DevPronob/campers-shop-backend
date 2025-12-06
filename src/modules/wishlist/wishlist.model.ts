
import { model, Schema } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistModel = new Schema<IWishlist>({
    productId: { type: Schema.Types.ObjectId,ref:'Product', required: true },
    userId: { type: Schema.Types.ObjectId,ref:'User', required: true },
})


export const Wishlist = model<IWishlist>('Wishlist', wishlistModel);