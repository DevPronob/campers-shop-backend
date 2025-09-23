"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    let statusCode = 500;
    const errorSources = [
        {
            path: err.path,
            message: err.message
        }
    ];
    return {
        statusCode,
        errorSources,
        message: "Invalid Id"
    };
};
exports.default = handleCastError;
