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
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const seedSuperAdmin_1 = require("./utilitis/seedSuperAdmin");
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        'https://campers-ecom-frontend.vercel.app',
        'http://localhost:5173',
    ],
    credentials: true,
};
// ✅ CORS must come first, before any routes
app.use((0, cors_1.default)(corsOptions));
// ✅ Handle OPTIONS preflight requests
app.options('*', (0, cors_1.default)(corsOptions));
// Database connection caching for Serverless
let dbConnectionPromise = null;
const connectDB = () => {
    if (!dbConnectionPromise) {
        dbConnectionPromise = mongoose_1.default.connect(config_1.default.mongodb_url || "mongodb+srv://pronobroy3601:m3edI5rGJcZnDTcF@cluster0.kabo16c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Database connected successfully");
            try {
                yield (0, seedSuperAdmin_1.seedSuperAdmin)();
            }
            catch (err) {
                console.error("Super admin seeding failed:", err);
            }
        }))
            .catch((error) => {
            console.error("Database connection error:", error);
            dbConnectionPromise = null; // Reset connection promise to allow retrying on the next request
            throw error;
        });
    }
    return dbConnectionPromise;
};
// Start database connection in the background as soon as module loads
connectDB();
// Middleware to ensure DB connection before handling any requests
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        next();
    }
    catch (error) {
        next(error);
    }
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Error handling
app.use(notFound_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
