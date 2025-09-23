
import { model, Schema } from "mongoose";
import { TProduct } from "./products.interface";

const productModel = new Schema<TProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    description: { type: String, required: true },
    ratings: { type: Number, required: true },
    imageUrls: { type: [String] },
    stock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


export const Product = model<TProduct>('Product', productModel);