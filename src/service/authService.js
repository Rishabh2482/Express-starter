const { findUser } = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser( authDetails){
    const {email, password} = authDetails;      // destructuring the authDetails object to get the email and password now we can use email and password directly instead of authDetails.email and authDetails.password

    //~ 1. Check if there is a registered user with the given email
    const user = await findUser({email});
    if(!user){
        throw {message: "User not found", statusCode: 404};
    }

    //~ 2. If the user is found, check if the plain password matches the hashed password in the database
    const isPasswordValidated = await bcrypt.compare(password, user.password);
    if(!isPasswordValidated){
        throw {message: "Invalid password", statusCode: 401};
    }

    //~ 3. If the password is validated, create a JWT token and return
    const token = jwt.sign({ email: user.email, id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});

    return token;
}

module.exports = {
    loginUser
}