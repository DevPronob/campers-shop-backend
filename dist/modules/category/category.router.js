"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.ADMIN), category_controller_1.categoryController.createCategory);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), category_controller_1.categoryController.getCategory);
router.get('/:id', category_controller_1.categoryController.getSingleCategory);
// router.get('/:id', productController.getSingleProduct)
exports.categoryRoute = router;
