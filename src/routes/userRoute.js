const express = require('express');
const { createUser } = require('../controller/userController');

// we have to initialize a router object to add routes in a new file
// Router are used to segrigating your routes in different files
const userRouter = express.Router();

userRouter.post('/', createUser );  //this is route registration

module.exports = userRouter;    // exporting the router object
// we can use this router object in our app.js file

