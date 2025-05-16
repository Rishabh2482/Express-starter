const express = require('express');

const serverConfig = require ('./config/serverConfig');

const PORT = serverConfig.PORT;
const app = express();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${serverConfig.PORT}`);
})