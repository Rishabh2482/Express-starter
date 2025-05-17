const express = require('express');

const serverConfig = require ('./config/serverConfig');
const connectDB = require('./config/dbConfig');

const PORT = serverConfig.PORT;
const app = express();

app.use(express.json());     // bydefault the request body is not parsed, by express so we need to use bodyParser to parse the request body into json or anyother format.
app.use(express.text());
app.use(express.urlencoded({ extended:true }));

app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
})