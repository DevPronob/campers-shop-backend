"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const paymentWithUserData_validation_1 = require("./paymentWithUserData.validation");
const paymentWithUserData_controller_1 = require("./paymentWithUserData.controller");
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/createPayment', paymentWithUserData_controller_1.paymentController.createPayment);
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(paymentWithUserData_validation_1.paymentValidation.paymentValidationSchema), paymentWithUserData_controller_1.paymentController.createPaymentWithUser);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.USER), paymentWithUserData_controller_1.paymentController.getPaymentById);
exports.paymentRoute = router;
