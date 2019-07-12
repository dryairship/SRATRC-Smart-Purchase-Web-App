const InventoryItem = require('../models/inventoryItem.js');
const { addQuantities } = require('../utils/units.js');

function insertInventoryItem(productID, departmentID, quantity){
    return new Promise((resolve, reject) => {
        inventoryItem = new InventoryItem({
            productID: productID,
            departmentID: departmentID,
            quantity: quantity
        });
        inventoryItem.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "Inventory Item not created"
                });
            else
                resolve({
                    status: 201,
                    response: "Inventory Item successfully created"
                });
        });
    });
}

function findInventoryItemById(productID, departmentID){
    return new Promise((resolve, reject) => {
        InventoryItem.findOne({
            productID: productID,
            departmentID: departmentID
        },
        '-__v',
        function(err, inventoryItem){
            if(err || !inventoryItem)
                reject({
                    status: 404,
                    response: "Inventory Item not found"
                });
            else
                resolve({
                    status: 200,
                    response: inventoryItem
                });
        }); 
    });
}

function deleteInventoryItem(productID, departmentID){
    return new Promise((resolve, reject) => {
        InventoryItem.findOneAndDelete({
            productID: productID, 
            departmentID: departmentID
        }, 
        function(err, inventoryItem){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
            else if(!inventoryItem)
                reject({
                    status: 404,
                    response: "Inventory Item to be deleted"
                });
            else
                resolve({
                    status: 202,
                    response: "Inventory Item successfully deleted"
                });
        });
    });
}

function updateInventoryItem(productID, departmentID, deltaQuantity, multiplier){
    return new Promise((resolve, reject) => {
        InventoryItem.findOne({
            productID: productID,
            departmentID: departmentID
        },
        function(err, item){
            if(err){
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
                return;
            }else if(!item){
                reject({
                    status: 404,
                    response: "Inventory item not found"
                });
                return;
            }
            var originalQuantity = item.quantity;
            var newDeltaQuantity = {
                value: deltaQuantity.value*multiplier,
                unit: deltaQuantity.unit
            }
            addQuantities(originalQuantity, newDeltaQuantity)
            .then(resultantQuantity => {
                item.quantity = resultantQuantity;
                item.save((err, result) => {
                    if(err || !result){
                        reject({
                            status: 400,
                            response: "Cannot update inventory"
                        })
                    }else{
                        resolve({
                            status: 202,
                            response: "Inventory successfully updated"
                        });
                    }
                });
            })
            .catch(err => {
                reject(err);
            })
        });
    });
}


function findAllInventoryItemsByProductId(productID){
    return new Promise((resolve, reject) => {
        InventoryItem.find({
                productID: productID
            },
            '-__v', 
            function(err, inventoryItems){
                if(err || !inventoryItems )
                    reject({
                        status: 404,
                        response: [],
                        message: "No item found in inventory"
                    });
                else
                    resolve({
                        status: 200,
                        response: inventoryItems
                    });
            }
        );
    });
}

function transferInventoryItem(productID, fromDepartmentID, toDepartmentID, quantity){
    return new Promise((resolve, reject) => {
        InventoryItem.findOne({
            productID: productID,
            departmentID: fromDepartmentID
        },
        '-__v',
        function(err, inventoryItem){
            if(err || !inventoryItem)
                reject({
                    status: 400,
                    response: "Item not found in inventory"
                });
            else if(inventoryItem.quantity.value < quantity.value)
                reject({
                    status: 400,
                    response: "Not sufficient amount in inventory"
                });
        })
        .then(() => {
            return updateInventoryItem(productID, fromDepartmentID, quantity, -1);
        })
        .then(() => {
            return updateInventoryItem(productID, toDepartmentID, quantity, 1);
        })
        .then(() => {
            resolve({
                status: 202,
                response: "Successful transfer"
            });
        })
        .catch(error => {
            if(error.status && error.status==404){
                insertInventoryItem(productID, toDepartmentID, quantity)
                .then(() => {
                    resolve({
                        status: 202,
                        response: "Successful transfer"
                    });
                })
                .catch(error => {
                    reject({
                        status: 500,
                        response: "Transfer not successful"
                    });
                });
            }else{
                reject({
                    status: 500,
                    response: "Transfer not successful"
                });
            }
        });
    });
}

function findAllInventoryItemsByDepartmentId(departmentID){
    return new Promise((resolve, reject) => {
        InventoryItem.find({
            departmentID: departmentID
        },
        '-__v')
        .populate({
            path: 'details',
            select: '-__v'
        })
        .exec(function(err, items){
            if(!items){
                reject({
                    status: 404,
                    response: [],
                    message: "No items found in the inventory of this department"
                });
            }else{
                resolve({
                    status: 200,
                    response: items
                });
            }
        });
    });
}

module.exports = { insertInventoryItem, findInventoryItemById, updateInventoryItem, deleteInventoryItem, findAllInventoryItemsByProductId, transferInventoryItem, findAllInventoryItemsByDepartmentId };
