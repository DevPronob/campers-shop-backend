"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
const config = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    stripe: process.env.STRIPE,
    jwt_secret: process.env.JWT_SECRET,
};
exports.default = config;
