class AppError extends Error{
    constructor(message, statusCode){
        super(message); // This super call is necessary to call the parent class constructor to initialize the Error object
        this.statusCode = statusCode;   // Assign the status code to the instance of the error object
        Error.captureStackTrace(this, this.constructor);    // This line captures the stack trace of the error, which is useful for debugging
    }
}

module.exports = AppError;