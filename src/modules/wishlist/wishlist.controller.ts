import httpStatus from "http-status";
import { WishlistService } from "./wishlist.service";
import sendResponse from "../../utilitis/sendResponse";

const createWishlistItem = async(req:any, res:any) => {
    const {productId} = req.body;
    const userId = req.user?.id;
    const wishlistItem = await WishlistService.createWhishlistItemDto(productId, userId);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'wishlist item created successfully',
        data: wishlistItem
    })
}

const getWishlistItems = async(req:any, res:any) => {
    const userId = req.user?.id;
    const wishlistItems = await WishlistService.getWishlistItems(userId);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'wishlist items created successfully',
        data: wishlistItems
    })
    
}
const deleteWishlistItem = async(req:any, res:any) => {
    const {id} = req.params;
    const wishlistItem = await WishlistService.deleteWishlistItem(id);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'wishlist item deleted successfully',
        data: wishlistItem
    })
}

export const WishlistController = {
    createWishlistItem,
    getWishlistItems,
    deleteWishlistItem
}