import RequestError from "../utilities/error/RequestError.js";
function errorHandler(error, req, res, next) {
    console.log('in handler')
    console.error(error)
    if (error instanceof RequestError) {
        return res.status(error.statusCode).json({error: error.error, message: error.message || 'An error occurred!'})
    }
    return res.status(500).json({error: error, message: 'Something went wrong!'})
}

export default errorHandler