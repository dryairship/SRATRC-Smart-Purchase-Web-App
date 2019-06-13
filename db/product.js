const Product = require('../models/product.js');

function insertProduct(name, category, description){
    return new Promise((resolve, reject) => {
        product = new Product({
            name: name,
            category: category,
            description: description
        });
        product.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "Product not created"
                });
            else
                resolve({
                    status: 202,
                    response: "Product successfully created"
                });
        });
    });
}

function findProductById(id){
    return new Promise((resolve, reject) => {
        Product.findOne({
            _id: id
        },
        '-__v',
        function(err, product){
            if(err || !product)
                reject({
                    status: 404,
                    response: "Product not found"
                });
            else
                resolve({
                    status: 200,
                    response: product
                });
        });
    });
}

module.exports = { insertProduct, findProductById };
