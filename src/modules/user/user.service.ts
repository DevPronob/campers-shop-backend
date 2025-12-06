import AppError from "../../errors/AppError";
import { useToken } from "../../utilitis/token";
import { USER_ROLE } from "./user.constant";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const registerUser = async(user: IUser) => {
    const isUserExist =await User.findOne({ email: user.email });
    if (isUserExist) {
        throw new AppError(500,"User already exist");
    }
    const result = await User.create(user);
    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: result._id
    }
    const token =useToken(userData)
    return token;
}
const logInUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    const isPasswordCorrect = await user.comparePassword(password as string);
    console.log(isPasswordCorrect,"isPasswordCorrect")
    if (!isPasswordCorrect) {
        throw new AppError(401, "Incorrect password");
    }
    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
    }
    const token =useToken(userData)
    return token;
};
const getUserById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(404, "User not found");
    }
    return user;
};
const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    return user;
};
const updateRoleByAdmin = async (id: string, role: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true } // return updated doc + validate
  );

  return updatedUser;
};

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}


export const userService = {
    registerUser,
    logInUser,
    getUserById,
    getUserByEmail,
    updateRoleByAdmin,
    getAllUsers
}
