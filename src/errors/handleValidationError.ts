import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const statusCode = 400
    const errorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })

    return {
        statusCode,
        errorSources,
        message: 'Mongoose Validation Error'
    }

}

export default handleValidationError