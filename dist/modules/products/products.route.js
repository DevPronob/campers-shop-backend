"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const product_controller_1 = require("./product.controller");
const products_validation_1 = require("./products.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(products_validation_1.productValidation.productsValidationSchema), product_controller_1.productController.createProduct);
router.get('/', product_controller_1.productController.getProduct);
router.get('/:id', product_controller_1.productController.getSingleProduct);
router.put('/:id', product_controller_1.productController.updateProduct);
router.put('/updateMProduct', product_controller_1.productController.updateMultipleProduct);
router.delete('/:id', product_controller_1.productController.deleteProduct);
exports.productRoute = router;
