const {modele} = require('mongoose');

const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");

async function createUser(req, res){
    console.log("Create user Controller called");
    console.log(req.body);

    const userService = new UserService(new UserRepository());

    try{
        // const response = await userService.createUser(req.body);  This was creating problem find out why.
        const response = await userService.registerUser(req.body);    // This is fixed
        return res.json({
            message: 'Successfully registered the user',
            sucess: true,
            data: response,
            error: {}
        })
    }catch(error){
        return res.status(error.status).json({
            success: false,
            message: error.reason || 'Something went wrong',
            data: {},
            error: error
        })
    }
}

module.exports = {
    createUser
}