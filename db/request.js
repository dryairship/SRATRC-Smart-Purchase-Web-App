const Request = require('../models/request.js');
const { addQuantities } = require('../utils/units.js');
const { transferInventoryItem } = require('./inventoryItem.js');

function insertRequest(departmentID, productID, quantity, timestamp){
    return new Promise((resolve, reject) => {
        request = new Request({
            departmentID: departmentID,
            productID: productID,
            quantity: quantity,
            quantityRemaining: quantity,
            timestamp: timestamp
        });
        request.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "Request not created"
                });
            else
                resolve({
                    status: 201,
                    response: "Successfully created request for item"
                });
        });
    });
}

function findRequestById(id){
    return new Promise((resolve, reject) => {
        Request.findById(
        id,
        '-__v',
        function(err, request){
            if(err || !request)
                reject({
                    status: 404,
                    response: "Request not found"
                });
            else
                resolve({
                    status: 200,
                    response: request
                });
        });
    });
}

function findAllRequests(){
    return new Promise((resolve, reject) => {
        Request.find(
        null,
        '-__v')
        .populate({
            path: 'productDetails',
            select: '-__v'
        })
        .exec(function(err, requests){
            if(err || !requests )
                reject({
                    status: 404,
                    response: [],
                    message: "No requests found"
                });
            else
                resolve({
                    status: 200,
                    response: requests
                });
        });
    });
}

function updateRequest(id, fromDepartment, deltaQuantity){
    return new Promise((resolve, reject) => {
        Request.findOne({
            _id: id
        },
        function(err, request){
            if(err){
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
                return;
            }else if(!request){
                reject({
                    status: 404,
                    response: "Request not found"
                });
                return;
            }
            
            transferInventoryItem(request.productID, fromDepartment, request.departmentID, deltaQuantity)
            .then(() => {
                var remainingQuantity = request.quantityRemaining;
                var newDeltaQuantity = {
                    value: -deltaQuantity.value,
                    unit: deltaQuantity.unit
                }
                return addQuantities(remainingQuantity, newDeltaQuantity);
            })
            .then(resultantQuantity => {
                request.quantityRemaining = resultantQuantity;
                request.save((err, result) => {
                    if(err || !result)
                        reject({
                            status: 400,
                            response: "Cannot update request"
                        });
                    else
                        resolve({
                            status: 202,
                            response: "Request successfully updated"
                        });
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}

function deleteRequest(id){
    return new Promise((resolve, reject) => {
        Request.findByIdAndDelete(
        id,
        function(err, request){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
            else if(!request)
                reject({
                    status: 404,
                    response: "Request to be deleted was not found"
                });
            else
                resolve({
                    status: 202,
                    response: "Request successfully deleted"
                });
        });
    });
}
module.exports = { insertRequest, findRequestById, findAllRequests, updateRequest, deleteRequest };
