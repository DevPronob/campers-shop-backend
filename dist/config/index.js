"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const requiredEnvVars = [
    'MONGODB_URL',
    'JWT_SECRET',
    'NODE_ENV',
    'EMAIL',
    'PASSWORD',
];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing environment variable: ${key}`);
    }
});
const config = {
    port: process.env.PORT || '5000',
    mongodb_url: process.env.MONGODB_URL,
    stripe: process.env.STRIPE || '', // optional
    jwt_secret: process.env.JWT_SECRET,
    node_env: process.env.NODE_ENV,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
};
exports.default = config;
