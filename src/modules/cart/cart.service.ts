import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Cart } from "./cart.model";
import { Types } from "mongoose";

// 🔹 Add product to cart
const createCartIntoDb = async (payload: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  const { userId, productId, quantity } = payload;
  console.log(payload,"payload in createCartIntoDb")

  let cart = await Cart.findOne({ userId });

  // If cart does not exist
  if (!cart) {
    return await Cart.create({
      userId,
      items: [
        {
          productId: new Types.ObjectId(productId),
          quantity,
        },
      ],
    });
  }

  // Check if product already exists in cart
  const item = cart.items.find(
    (i) => i.productId.toString() === productId
  );

  if (item) {
    // Add quantity instead of just +1
    item.quantity += quantity;
  } else {
    cart.items.push({
      productId: new Types.ObjectId(productId),
      quantity,
    });
  }

  await cart.save();
  return cart;
};

// 🔹 Get cart by user
const getCartFromDb = async (userId: string) => {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId"
  );

  // if (!cart) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  // }

  return cart;
};

// 🔹 Update quantity
const updateCartIntoDb = async (payload: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  const { userId, productId, quantity } = payload;
  console.log(payload,"payload in updateCartIntoDb")

  const cart = await Cart.findOne({ userId });
  console.log(productId,"cart in updateCartIntoDb")

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

 const item =cart.items.find((i) => i.productId.toString() === productId);
 console.log(item,"item in updateCartIntoDb")

  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not in cart");
  }
  console.log(quantity,"quantity in updateCartIntoDb")

  item.quantity = quantity;
  await cart.save();

  return cart;
};

// 🔹 Remove product from cart
const deleteCartFromDb = async (payload: {
  userId: string;
  id: string;
}) => {
  const { userId, id } = payload;

  const cart = await Cart.findOne({ userId });
  console.log(cart,"cart in deleteCartFromDb")

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

  cart.items = cart.items.filter(
    (i:any) => i._id.toString() !== id
  );

  console.log(cart,"cart after filter")
  console.log(id," after filter")

  await cart.save();
  return cart;
  
};

// 🔹 Clear cart after order
const clearCartFromDb = async (userId: string) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.items = [];
  await cart.save();
  return cart;
};

export const cartService = {
  createCartIntoDb,
  getCartFromDb,
  updateCartIntoDb,
  deleteCartFromDb,
  clearCartFromDb,
};
