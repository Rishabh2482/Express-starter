// const {module} = require('mongoose');

function createUser(req, res){
    console.log("Create user Controller called");
    console.log(req.body);

    return res.json({
        message: 'OK'
    })
}

module.exports = {
    createUser
}