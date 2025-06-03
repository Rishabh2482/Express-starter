const express = require('express');
const {addProduct, getProduct, deleteProduct} = require('../controller/productController');
const uploader = require('../middlewares/multerMiddlewares');

const productRouter = express.Router();

productRouter.post('/',uploader.single('productImage') , addProduct);
productRouter.get('/:id' ,getProduct);
productRouter.delete('/:id',deleteProduct);

module.exports = productRouter;