"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const category_model_1 = require("./category.model");
const createCategoryIntoDb = (payload) => {
    const result = category_model_1.Category.create(payload);
    return result;
};
const getCategoryFromDb = () => {
    const result = category_model_1.Category.find({});
    return result;
};
const getSingleCategoryFromDb = (id) => {
    const result = category_model_1.Category.find({ _id: id });
    return result;
};
exports.categoryService = {
    createCategoryIntoDb,
    getCategoryFromDb,
    getSingleCategoryFromDb
};
