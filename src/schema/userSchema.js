const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'First name is required'],// if we are crating a new user, using mongoose than this will be required this has nothing to do with the mongodb database there is no required in the database, it is for the creating a new user using mongoose on Express.js Server not for the database.
        minlength: [5,"First name must be at least 5 characters long"],
        trim: true, // this will remove the spaces from the beginning and end of the string automatically
        maxlength: [20,"First name must be at most 20 characters long"],
        lowercase: true,
    },
    lastName:{
        type: String,
        required: [true, 'Last name is required'],
        minlength: [5,"Last name must be at least 5 characters long"],
        trim: true,
        maxlength: [20,"Last name must be at most 20 characters long"],
        lowercase: true,
    },
    mobileNumber:{
        type: String,
        required: [true, 'Mobile number is required'],
        unique: [true, 'Mobile number must be unique'],
        maxlength: [10,"Mobile number must be at most 10 characters long"],
        minlength: [10,"Mobile number must be at least 10 characters long"],
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        trim: true,
        // email should be in the format of email so we will write a regex(regular expression) for that.
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6,"Password must be at least 8 characters long"],
        // we can also apply alpha numeric and special characters validation using regex
        trim: true,
    }
},{
    timestamps: true, // this will create two fields in the database createdAt and updatedAt
})

userSchema.pre('save', async function(){
    // here u can modify your user before it is saved in mongodb
    const hashedPassword = await bcrypt.hash(this.password, 10); // this will hash the password before saving it to the database
    this.password = hashedPassword; // this will set the password to the hashed password
})

const User = mongoose.model('User', userSchema);  // this will create a new collection in the database with the name 'users' and the schema will be userSchema. mongoose will automatically create a collection with the name 'users' in the database if it does not exist. if it exists, it will use the existing collection.

module.exports = User;