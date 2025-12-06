"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.registerUser = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const token_1 = require("../../utilitis/token");
const user_model_1 = require("./user.model");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: user.email });
    if (isUserExist) {
        throw new AppError_1.default(500, "User already exist");
    }
    const result = yield user_model_1.User.create(user);
    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: result._id
    };
    const token = (0, token_1.useToken)(userData);
    return token;
});
exports.registerUser = registerUser;
const logInUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    console.log(isPasswordCorrect, "isPasswordCorrect");
    if (!isPasswordCorrect) {
        throw new AppError_1.default(401, "Incorrect password");
    }
    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
    };
    const token = (0, token_1.useToken)(userData);
    return token;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    return user;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    return user;
});
const updateRoleByAdmin = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true } // return updated doc + validate
    );
    return updatedUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
exports.userService = {
    registerUser: exports.registerUser,
    logInUser,
    getUserById,
    getUserByEmail,
    updateRoleByAdmin,
    getAllUsers
};
