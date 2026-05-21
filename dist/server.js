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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const seedSuperAdmin_1 = require("./utilitis/seedSuperAdmin");
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongodb_url || "mongodb+srv://pronobroy3601:m3edI5rGJcZnDTcF@cluster0.kabo16c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully");
        yield (0, seedSuperAdmin_1.seedSuperAdmin)();
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
});
// Start database connection
connectDB();
// Only start the listener if we are running in a local environment (not Vercel)
if (!process.env.VERCEL) {
    app_1.default.listen(config_1.default.port, () => {
        console.log(`Server running on port ${config_1.default.port}`);
    });
}
exports.default = app_1.default;
