const { insertInventoryItem, findInventoryItemById, updateInventoryItem, deleteInventoryItem } = require('../db/inventoryItem.js');

function handleInventoryItemPost(req, res) {
    var productID = req.body.productID,
        departmentID = req.body.departmentID, 
        amount = {
            quantity : req.body.quantity,
            unit : req.body.unit
        };
    
    insertInventoryItem(productID, departmentID, amount)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleInventoryItemGetById(req, res) {
    findInventoryItemById(req.params.productID, req.params.departmentID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleInventoryItemPatch(req, res) {
    var newInventoryItem = {};
    if(req.body.productID)
        newInventoryItem['productID'] = req.body.productID;
    if(req.body.departmentID)
        newInventoryItem['departmentID'] = req.body.departmentID;
    if(req.body.quantity && req.body.unit)
        newInventoryItem['amount'] = {
            quantity: req.body.quantity,
            unit: req.body.unit
        };

    updateInventoryItem(req.params.productID, req.params.departmentID, newInventoryItem)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}


function handleInventoryItemDelete(req, res) {
    deleteInventoryItem(req.params.productID, req.params.departmentID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleInventoryItemPost, handleInventoryItemGetById, handleInventoryItemPatch, handleInventoryItemDelete }