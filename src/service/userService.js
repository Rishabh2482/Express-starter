const { findUser, createUser } = require("../repository/userRepository");

async function registerUser(userDetails){
        console.log("Service layer called");
        //  it will create a brand new user in the db

        // 1. We need to check if the user with same email or phone number already exists or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        })

        if(user){
            // we found a user
            throw {reason: 'User with given email and phone number already exists', status:400};
        }

        // 2. If not exists, then create a new in the database
        const newUser = await createUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
        });
        if(!newUser){
            // if user is not created
            throw {reason: 'User not created', status: 500};
        }

        // 3. Return the details of created user.
        return newUser;
    }

module.exports = registerUser;