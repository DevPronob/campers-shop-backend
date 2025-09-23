const handleDuplicateError = (err: any) => {
    const statusCode = 400
    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources = [
        {
            path: err.path,
            message: `${extractedMessage} is already exists`
        }
    ]

    return {
        statusCode,
        errorSources,
        message: err.message
    }
}
export default handleDuplicateError;