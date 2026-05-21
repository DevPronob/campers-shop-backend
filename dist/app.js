"use strict";
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
