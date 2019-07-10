const { insertInventoryItem, findInventoryItemById, updateInventoryItem, deleteInventoryItem, findAllInventoryItemsByProductId, transferInventoryItem, findAllInventoryItemsByDepartmentId } = require('../db/inventoryItem.js');

function handleInventoryItemPost(req, res) {
    var productID = req.body.productID,
        departmentID = req.body.departmentID, 
        quantity = {
            value : req.body.quantity,
            unit : req.body.unit
        };
    
    insertInventoryItem(productID, departmentID, quantity)
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
    var value;
    if(req.body.value)
        value = req.body.value;
    else
        res.status(400).json('No Change');
    
    updateInventoryItem(req.params.productID, req.params.departmentID, value)
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

function handleInventoryItemGetByProductId(req, res) {
    findAllInventoryItemsByProductId(req.params.productID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleInventoryItemGetByDepartmentId(req, res) {
    findAllInventoryItemsByDepartmentId(req.params.departmentID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleTransferInventoryItem(req, res){
    var quantity = {};
    if(req.body.qValue && req.body.unit){
        quantity.value = req.body.qValue;
        quantity.unit = req.body.unit;
    }else{
        res.status(400).json('No Change');
        return;
    }
    
    transferInventoryItem(req.body.productID, req.user.department, req.body.toDepartmentID, quantity)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleInventoryItemPost, handleInventoryItemGetById, handleInventoryItemPatch, handleInventoryItemDelete, handleInventoryItemGetByProductId, handleInventoryItemGetByDepartmentId, handleTransferInventoryItem };
