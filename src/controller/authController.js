const { loginUser } = require("../service/authService");

async function login(req, res){

    try{
        const loginPayload = req.body;

        // auth service
        const response = await loginUser(loginPayload);

        //~ this convert the JWT token(obtain from the above response) into a cookie and send it to the client.
        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7*24*60*60*1000, // 7 days
        })
        
        // ~ this will be sent to the client as a response so that the client can know that the user is logged in successfully.
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {},
            error: {}
        })
    }catch(error){ //~if any error occures or the user is not found or the password is invalid, then this block will be executed.
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
            data: {},
            error: error
        })
    }
    
}

module.exports = {
    login
};

/**
 * ! # JWT vs Cookie

| Concept                  | Description                                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **JWT (JSON Web Token)** | A **compact, signed token** used for authentication and authorization. It carries user info and is verified by the server.                                                           |
| **Cookie**               | A **storage mechanism** used by browsers to hold small pieces of data (like session IDs, preferences, or a JWT). Cookies are sent automatically in HTTP requests to the same domain. |


 */
