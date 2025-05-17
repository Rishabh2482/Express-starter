const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');


/**
 * The Below function helps to connect to the MongoDB database using Mongoose,using the URL from the serverConfig file.
 */

async function connectDB(){
    try{
        await mongoose.connect(serverConfig.DB_URL);
        console.log("MongoDB connected successfully");
    }catch{
        console.error("MongoDB connection failed");
        process.exit(1);
    }
}

module.exports = connectDB;