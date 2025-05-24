const express = require('express');
const cookieParser = require('cookie-parser');
const serverConfig = require ('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');

const PORT = serverConfig.PORT;
const app = express();

app.use(cookieParser());   //  cookieParser is used to parse the cookies in the request and make them available in req.cookies
app.use(express.json());     // bydefault the request body is not parsed, by express so we need to use bodyParser to parse the request body into json or anyother format.
app.use(express.text());
app.use(express.urlencoded({ extended:true }));

//~ Routing middleware
app.use('/user', userRouter);    //! connectes the router to server, setting the userRouter
app.use('/carts', cartRouter);      //! connectes the router to server, setting the cartRouter
app.use('/auth', authRouter);      //! connectes the router to server, setting the authRouter

app.get('/ping', isLoggedIn, (req, res)=>{ // This route is protected by the isLoggedIn middleware, which checks if the user is authenticated before allowing access to this route.
    // controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "Pong"});
})

app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
})


//  how localhost:3000/user - Post Than how will be it handleded ?
//  Ans:- First it will go to /user in the server (index.js) and then it will go to userRouter object in userRoutes.js and then it will go to createUser function in userController.js

// localhost:3400/carts/1234