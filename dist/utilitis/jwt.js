"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded === 'string') {
            return null; // in case it's a string instead of an object
        }
        return decoded;
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
exports.verifyToken = verifyToken;
