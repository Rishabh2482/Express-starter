const multer =require('multer');
const path = require('path');

// multer is a middleware for handling multipart/form-data, which is used for uploading files.
// The storageConfiguration is used to configure the storage location and filename for the uploaded files.(Multer uses this configuration to store the files in the specified location with the specified filename format.)
const storageConfiguration = multer.diskStorage({
    destination: (req, file, next)=>{
        next(null, 'uploads/')
    },
    filename: (req, file, next)=>{
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploader = multer({storage: storageConfiguration})

module.exports = uploader;