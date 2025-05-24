const express = require('express');
const {login} = require('../controller/authController');

const authRouter = express.Router();

authRouter.post('/login', login);

module.exports = authRouter;