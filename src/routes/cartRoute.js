const express = require('express');
const getCartById = require('../controller/cartController');

const cartRouter = express.Router();

cartRouter.post('/:id', getCartById);

module.exports = cartRouter;