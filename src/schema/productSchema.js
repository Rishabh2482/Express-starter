const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [3, 'Product name must be at least 3 characters long'],
        trim: true
    },
    description: {
        type: String,
        minlength: [10, 'Description must be at least 10 characters long'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    productImage:{
        type: String
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks', 'desserts'],
        default: 'veg',
    },
    inStock: {
        type: Boolean,
        required: [true, 'In stock status is required'],
        default: true
    }},{
    timestamps: true // this will create two fields in the database createdAt and updatedAt
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;