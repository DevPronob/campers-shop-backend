import { Types } from "mongoose";

export type TProduct = {
    name: string;
    price: number;
    category: Types.ObjectId|null;
    description: string;
    imageUrls: string[];
    stock: number;
    isFeatured: boolean;
    isBestSelling: boolean;
    ratings: number;
    createdAt: Date;
    updatedAt: Date;
}