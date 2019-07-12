const { insertProduct, findProductById, findAllProducts, updateProduct, deleteProduct } = require('../db/product.js');

function handleProductPost(req, res) {
    var name = req.body.name,
        category = req.body.category,
        description = req.body.description;
    if(!name || !category || !description)
        res.status(422).json("A required field is empty");
    else {
        insertProduct(name, category, description)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function handleProductGetById(req, res) {
    findProductById(req.params.productID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleProductGetAll(req, res) {
    findAllProducts()
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleProductPatch(req, res) {
    var newProduct = {};
    if(req.body.name)
        newProduct['name'] = req.body.name;
    if(req.body.category)
        newProduct['category'] = req.body.category;
    if(req.body.description)
        newProduct['description'] = req.body.description;
    
    updateProduct(req.params.productID, newProduct)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleProductDelete(req, res) {
    deleteProduct(req.params.productID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleProductGetById, handleProductGetAll, handleProductPost, handleProductPatch, handleProductDelete };
