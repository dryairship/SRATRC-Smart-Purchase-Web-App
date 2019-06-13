const { insertProduct, findProductById } = require('../db/product.js');

function handleProductPost(req, res) {
    var name = req.body.name,
        category = req.body.category,
        description = req.body.description;
    
    insertProduct(name, category, description)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleProductGet(req, res) {
    findProductById(req.params.productID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleProductGet, handleProductPost };
