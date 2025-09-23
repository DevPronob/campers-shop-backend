"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jwt_1 = require("./jwt");
const config_1 = __importDefault(require("../config"));
const useToken = (payload) => {
    const userData = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
    };
    console.log(userData, "userData");
    const accessToken = (0, jwt_1.generateToken)(userData, config_1.default.jwt_secret);
    const refreshToken = (0, jwt_1.generateToken)(userData, config_1.default.jwt_secret);
    return {
        accessToken,
        refreshToken: refreshToken,
    };
};
exports.useToken = useToken;
