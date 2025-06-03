const { getProductById, delProductById } = require('../service/productService');
const {createProduct} = require('../service/productService');
const AppError = require('../utils/appError');

async function addProduct(req, res) {
    
    try{
        const product = await createProduct({       //! Why we are putting await here ?, because we are calling an async function in the service layer
        productName: req.body.productName,
        price: req.body.price,
        imagePath: req.file?.path,                          //! This fix the error of imagePath being undefined if no file image is uploaded. '?' is optional chaining operator, it checks if req.file exists before accessing the path property.
        description: req.body.description,
        category: req.body.category,
        inStock: req.body.inStock
        })
        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            error: {},
            data: product
        });
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating the product',
            data: {},
            error: error
        })
    }
    
}


async function getProduct(req, res){
    try{
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: response,
            error: {}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching the product',
            data: {},
            error: error
        })
    }
}

async function deleteProduct(req, res){
    try{
        const response = await delProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: response,
            error: {}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating the product',
            data: {},
            error: error
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
};