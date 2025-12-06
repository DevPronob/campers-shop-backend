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
exports.auth = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../utilitis/jwt");
const auth = (...userRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
            if (!token) {
                throw new AppError_1.default(401, "You do not have a token to access this route");
            }
            const verifiedToken = (0, jwt_1.verifyToken)(token, "shhhhh");
            if (!(verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.email)) {
                throw new AppError_1.default(401, "Token is invalid or missing email");
            }
            const user = yield user_model_1.User.findOne({ email: verifiedToken.email });
            if (!user) {
                throw new AppError_1.default(404, "User does not exist");
            }
            if (!userRoles.includes(user.role)) {
                throw new AppError_1.default(403, "You are not allowed to access this route");
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.log("jwt error", error);
            next(error);
        }
    });
};
exports.auth = auth;
