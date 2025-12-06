import AppError from "../../errors/AppError";
import { TProduct } from "../products/products.interface";
import { Wishlist } from "./wishlist.model";

const createWhishlistItemDto = async(productId:string, userId?:string) => {
    const existingItem = await Wishlist.findOne({productId, userId});
    if(existingItem){
        throw new AppError(400,"Product already in wishlist");
    }
const wishListItem =await Wishlist.create({productId, userId});
return wishListItem;
}

const getWishlistItems = async(userId:string) => {
    const wishlistItems = await Wishlist.find({userId}).populate("productId").populate("userId");
    return wishlistItems;
}
const deleteWishlistItem = async(id:string) => {
    const wishlistItem = await Wishlist.findByIdAndDelete(id);
    return wishlistItem;
}
export const WishlistService = {
    createWhishlistItemDto,
    getWishlistItems,
    deleteWishlistItem
}