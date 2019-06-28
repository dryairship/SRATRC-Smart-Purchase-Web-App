const InventoryItem = require('../models/inventoryItem.js')

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

function updateInventoryItem(productID, departmentID, value){
    return new Promise((resolve, reject) => {
        InventoryItem.updateOne({
            productID: productID,
            departmentID: departmentID
        },
        {
            $inc: {
                'quantity.value' :  value
            }
        },
        function(err, result){
            if(err)
                reject({
                    status: 500, 
                    response: "A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status: 404, 
                    response: "Inventory Item not found"
                });
            else if(result.nModified == 0)
                resolve({
                    status: 200, 
                    response: "Inventory Item was already up-to-date"
                });
            else 
                resolve({
                    status: 202,
                    response: "Inventory Item successfully updated"
                });
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
                if(err || !inventoryItems || inventoryItems.length == 0 )
                    reject({
                        status: 404, 
                        response: "No item found in inventory"
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

function transferInventoryItem(productID, fromDepartmentID, toDepartmentID, value){
    return new Promise((resolve, reject) => {
        InventoryItem.findOne({
            productID: productID,
            departmentID: fromDepartmentID
        },
        '-__v',
        function(err, inventoryItem){
            if(err || !inventoryItem)
                reject({
                    status: 404, 
                    response: "Item not found in inventory"
                });
            else if(inventoryItem.quantity.value < value)
                reject({
                    status: 400, 
                    response: "Not sufficient amount in inventory"
                });
        })
        .then(() => {
            updateInventoryItem(productID, fromDepartmentID, -value),
            updateInventoryItem(productID, toDepartmentID, value)
            .then(() => {
                resolve({
                    status: 202,
                    response: "Successful transfer"
                });
            })
            .catch(() => {
                reject({
                    status: 500,
                    response: "Update not successful"
                });
            });
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
            if(!items || items.length==0){
                reject({
                    status: 404,
                    response: "No items found in the inventory of this department"
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
