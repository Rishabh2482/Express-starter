const AppError = require("./appError");

// This error is thrown when there is something wrong at server side, e.g. database connection issues, server crashes, etc.
class InternalServerError extends AppError {
    constructor(properties, resource){
        super(`It's not you it's our server where something went wrong`, 500);
    }
}

module.exports = InternalServerError;