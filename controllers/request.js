const { insertRequest, findRequestById, findAllRequests, updateRequest, deleteRequest } = require('../db/request.js');

function handleRequestPost(req, res) {
    var departmentID = req.user.department,
        productID = req.body.productID,
        quantity = {
            value: req.body.qValue,
            unit: req.body.qUnit
        },
        timestamp = Date.now();
    if(!productID || !quantity.value || !quantity.unit || !timestamp)
        res.status(422).json("A required field is empty");
    else {
        insertRequest(departmentID, productID, quantity, timestamp)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function handleRequestGetById(req, res) {
    findRequestById(req.params.requestID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleRequestGetAll(req, res) {
    findAllRequests()
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleRequestPatch(req, res) {
    var deltaQuantity = {
        value: req.body.qValue,
        unit: req.body.qUnit
    };
    
    updateRequest(req.params.requestID, req.user.department, deltaQuantity)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleRequestDelete(req, res) {
    deleteRequest(req.params.requestID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleRequestGetById, handleRequestGetAll, handleRequestPost, handleRequestPatch, handleRequestDelete };
