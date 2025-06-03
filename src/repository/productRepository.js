const product = require('../schema/productSchema');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productDetails){
    try{
        const response = await product.create(productDetails)
        return response; // Return the created product
    }catch(error){
        if (error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();    
    }
}

async function getProductById(productId){
    try{
        const productData = await product.findById(productId);
        return productData;
    }catch(error){
        console.error("Error Getting product:", error);
        throw new InternalServerError();
    }
}

async function delProductById(productId){
    try{
        const productData = await product.findByIdAndDelete(productId);
        console.log(productData);
        return productData; // Return productData if the product was deleted successfully
    }catch(error){
        console.error("Error Getting product:", error);
        throw new InternalServerError();
    }
}

module.exports = {
    createProduct,
    getProductById,
    delProductById
}