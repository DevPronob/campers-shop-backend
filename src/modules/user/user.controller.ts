import { Request, Response } from "express";
import { USER_ROLE } from "./user.constant";
import { userService } from "./user.service";
import sendResponse from "../../utilitis/sendResponse";
import { setAuthCookie } from "../../utilitis/setCookie";
import { IUser, IUserDocument } from "./user.interface";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, address, phone } = req.body;
  const user = {
    name,
    email,
    password,
    address,
    phone,
    role: USER_ROLE.USER,
  };
  const result = await userService.registerUser(user);
 
  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    data: result,
    success: true,
  });
  
};

const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email,password)
  const user = await userService.logInUser(email, password);
   setAuthCookie(res, user);
  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
    success: true,
  });
  
};
const getUserById = async (req: Request, res: Response) => {
  const id = (req.user as IUserDocument)._id;
  const user = await userService.getUserById(id as any);
  sendResponse(res, {
    statusCode: 200,
    message: "User found successfully",
    data: user,
    success: true,
  });
};
const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await userService.getUserByEmail(email);
  sendResponse(res, {
    statusCode: 200,
    message: "User found successfully",
    data: user,
    success: true,
  });
};
const updateRoleByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await userService.updateRoleByAdmin(id, role);
  sendResponse(res, {
    statusCode: 200,
    message: "User role updated successfully",
    data: user,
    success: true,
  });
  console.log(id,role,"akkjff")

};
const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    message: "Users found successfully",
    data: users,
    success: true,
  });
};

export const userController = {
  registerUser,
  logInUser,
  getUserById,
  getUserByEmail,
  updateRoleByAdmin,
  getAllUsers,
};
