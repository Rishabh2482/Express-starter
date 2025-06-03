const AppError = require("./appError");

//  when the requested resource is not found, this error is thrown
class NotFoundError extends AppError {
    constructor( resource){

        super(`Not able to find ${resource}`, 404);
    }
}

module.exports = NotFoundError;