import { model, Model, Schema } from "mongoose";
import { TCategory } from "./category.interface";


const categoryScheama = new Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    products:{
        type:[Schema.Types.ObjectId],
        ref:"Product"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const Category = model<TCategory>('Category', categoryScheama)
