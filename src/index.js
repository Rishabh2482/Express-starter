const express = require('express');

const serverConfig = require ('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');

const PORT = serverConfig.PORT;
const app = express();

app.use(express.json());     // bydefault the request body is not parsed, by express so we need to use bodyParser to parse the request body into json or anyother format.
app.use(express.text());
app.use(express.urlencoded({ extended:true }));

// Routing middleware
//~  if your req route starts with /user then it will be handled by userRouter
app.use('/user', userRouter);    // connectes the router to server
app.use('carts', cartRouter);      
app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);

    //         const newUser = await User.create({
    //             firstName: 'Rishabh',
    //             lastName: 'Kumar',
    //             mobileNumber: '9134567890',
    //             email: 'a@b.com',
    //             password: '12345678'
    //         });
    //         console.log('User created successfully');
    //         console.log(newUser);
})


//  how localhost:3000/user - Post Than how will be it handleded ?
//  Ans:- First it will go to /user in the server (index.js) and then it will go to userRouter object in userRoutes.js and then it will go to createUser function in userController.js

// localhost:3400/carts/1234