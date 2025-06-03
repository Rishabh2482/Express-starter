const AppError = require("./appError");

// When the request has invalid parameters, this error is thrown and it is user's mistake.
class BadRequestError extends AppError {
    constructor(invalidParams){
        // invalidParams : []

        let message = "";
        invalidParams.foreach(params => message += `${params}, `);

        super(`The request has the following invalid parameters \n ${invalidParams}`, 400);
    }
}

module.exports = BadRequestError;