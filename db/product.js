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
                    status: 201,
                    response: product._id
                });
        });
    });
}

function findProductById(id){
    return new Promise((resolve, reject) => {
        Product.findById(
        id,
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

function findAllProducts(){
    return new Promise((resolve, reject) => {
        Product.find(
        null,
        '-__v',
        function(err, products){
            if(err || !products)
                reject({
                    status: 404,
                    message: "No products found",
                    response: []
                });
            else
                resolve({
                    status: 200,
                    response: products
                });
        });
    });
}

function updateProduct(id, newProduct){
    return new Promise((resolve, reject) => {
        Product.updateOne({
            _id: id
        },
        newProduct,
        function(err, result){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status: 404,
                    response: "Product not found"
                });
            else if(result.nModified == 0)
                resolve({
                    status: 200,
                    response: "Product was already up-to-date"
                });
           else
                resolve({
                    status: 202,
                    response: "Product successfully updated"
                });
        });
    });
}

function deleteProduct(id){
    return new Promise((resolve, reject) => {
        Product.findByIdAndDelete(
        id,
        function(err, product){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
            else if(!product)
                reject({
                    status: 404,
                    response: "Product to be deleted was not found"
                });
            else
                resolve({
                    status: 202,
                    response: "Product successfully deleted"
                });
        });
    });
}
module.exports = { insertProduct, findProductById, findAllProducts, updateProduct, deleteProduct };
