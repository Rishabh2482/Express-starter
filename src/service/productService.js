const productRepository = require('../repository/productRepository');
const cloudinary = require('../config/cloudinaryConfig')
const fs = require('fs/promises'); // Use fs/promises for async file operations
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){
    // 1. We should check if an image is coming to create the product, than we should upload the image to cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
            const response = await cloudinary.uploader.upload(imagePath);
            var productImage = response.secure_url;
            console.log(imagePath, "Image Path");
            await fs.unlink(imagePath);
        }catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }

    // 2. Then use the url from the cloudinary to create the product in the database
    const product = await productRepository.createProduct({
        ...productDetails,      
        productImage: productImage
    });

    if(!product){
        throw {reason: 'Not able to create product', status: 500};
    }

    return product; // Return the created product
}

async function getProductById(productId){
    const product = await productRepository.getProductById(productId);
    if(!product){
        throw new NotFoundError('Product');
    }
    return product;
}

async function delProductById(productId){
    const product = await productRepository.delProductById(productId);
    if(!product){
        throw new NotFoundError('Product');
    }
    return true; // Return true if the product was deleted successfully
}

module.exports = {
    createProduct,
    getProductById,
    delProductById
};