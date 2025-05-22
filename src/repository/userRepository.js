const User  = require('../schema/userSchema');

    async function findUser(parameters){
        try{
            const response = await User.findOne({...parameters})
            return response;
        }catch(error){
            // if error occurs while finding the user
            console.log("Error while finding the user",error);
        }
        
    }

    async function createUser(userDetails){
        try{
            const response =await User.create(userDetails);
            return response;
        }catch(error){
            console.log("Error in creating user",error);
        }

    }


module.exports = {
    findUser,
    createUser
}; // we are exporting the class not the object of class so we can create multiple objects of this class in the future if needed, whereas if we export the object then we can only create one object of this class.
// 1. findUser - this function will find the user in the database and return the user object if found else it will return null