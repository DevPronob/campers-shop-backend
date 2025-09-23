import { CastError } from "mongoose";

const handleCastError = (err: CastError) => {
    let statusCode = 500
    const errorSources = [
        {
            path: err.path,
            message: err.message
        }
    ]

    return {
        statusCode,
        errorSources,
        message: "Invalid Id"
    }
}


export default handleCastError