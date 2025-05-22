const registerUser = require("../service/userService");

async function createUser(req, res){
    console.log("Create user Controller called");
    console.log(req.body);

    try{
        const response = await registerUser(req.body); 
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