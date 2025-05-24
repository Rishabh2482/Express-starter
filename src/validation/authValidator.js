const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

// ! This middleware function checks if the user is logged in by verifying the JWT token stored in cookies, and the cookie is named "authToken", and it is not seen in the browser, it is only seen in the postman or any other API testing tool.
//! This middleware is used to protect the routes that require authentication, so that only authenticated users can access that perticular route, where this middleware is used.
async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"];

    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        })
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Invalid Auth Token"
        })
    }

    // if reched here, it means the user is authenticated then allow  to access the API calls.

    req.user = {    //  this will be available in the request object in the controller
        email: decoded.email,
        id: decoded.id,
    }

    next();

}

module.exports = {
    isLoggedIn
}