"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(cart_validation_1.cartValidation.cartValidationSchema), cart_controller_1.cartController.createCart);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), cart_controller_1.cartController.getCart);
router.put('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), cart_controller_1.cartController.updateCart);
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), cart_controller_1.cartController.deleteCart);
exports.cartRoute = router;
