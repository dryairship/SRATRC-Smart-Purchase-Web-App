const Payment = require('../models/payment.js');

function updatePayment(purchaseID, amount, paidBy, remarks, timestamp){
    return new Promise((resolve, reject) => {
        var installmentDetails = {
            timestamp : timestamp,
            amount : amount,
            paidBy : paidBy,
            remarks : remarks
        };

        var valid = 1;
        Payment.findOne({
            purchaseID: purchaseID
        },
        '-__v',
        function(err ,payment){
            if(err || !payment)
                reject({
                    status : 404,
                    response : "Invalid purchaseID"
                });
            else if(payment.amountRemaining < amount){
                valid = 0;
                reject({
                    status : 400,
                    response : "Amount greater than pending"
                });
            }
        })
        .then(() => {
            if(valid){
                Payment.updateOne({
                    purchaseID: purchaseID
                },
                {
                    $inc: {
                        amountRemaining : -amount
                    },
                    $push: {
                        installments : installmentDetails
                    }
                },
                function(err, result){
                    if(err)
                        reject({
                            status : 500,
                            response : "A server error occurred"
                        });
                    else if(result.n == 0)
                        reject({
                            status : 404,
                            response : "Invalid purchaseID"
                        });
                    else
                        resolve({
                            status : 202,
                            response : "Payment successfully done"
                        });
                });
            }
        })
        .catch(error => {
            reject({
                status : 500,
                response : "Update not successful"
            });
        }); 
    });
}

function insertPayment(purchaseID, vendorID, departmentID, productID, totalAmount){
    return new Promise((resolve, reject) => {
        payment = new Payment({
            purchaseID : purchaseID,
            vendorID : vendorID,
            departmentID: departmentID,
            productID: productID,
            amountRemaining : totalAmount
        });
        payment.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "Payment not created"
                });
            else
                resolve({
                    status: 202,
                    response: "Product purchased and payment created"
                });
        });
    });
}

function findPaymentByPurchaseID(id){
    return new Promise((resolve,reject) => {
        Payment.find({
            purchaseID : id 
        },
        '-__v',
        function(err, payments){
            if(err || !payments)
                reject({
                    status: 404,
                    response: "Payment not found"
                });
            else
                resolve({
                    status: 200,
                    response: payments
                });
        });
    });
}

function findPaymentByVendorID(id){
    return new Promise((resolve, reject) => {
        Payment.find({
            vendorID : id
        },
        '-__v',
        function(err, payments){
            if(err || !payments)
                reject({
                    status: 404,
                    response: [],
                    message: "Payments not found"
                });
            else
                resolve({
                    status: 200,
                    response: payments
                });
        });
    });
}

function findPaymentByDepartmentID(id){
    return new Promise((resolve, reject) => {
        Payment.find({
            departmentID : id
        },
        '-__v')
        .populate({
            path: 'productDetails',
            select: '-__v'
        })
        .populate({
            path: 'purchaseDetails',
            select: '-__v'
        })
        .populate({
            path: 'vendorDetails',
            select: '-__v'
        })
        .exec(function(err, items){
            payments = items.map(item => {
                var payment = {
                    amountRemaining: item.amountRemaining,
                    installments: item.installments,
                    purchase: item.purchaseDetails,
                    product: item.productDetails,
                    vendor: item.vendorDetails
                };
                return payment;
            });
            if(err || !payments)
                reject({
                    status: 404,
                    message: "Payments not found",
                    response: []
                });
            else
                resolve({
                    status: 200,
                    response: payments
                });
        });
    });
}


function findPaymentByProductID(id){
    return new Promise((resolve, reject) => {
        Payment.find({
            productID : id
        },
        '-__v')
        .populate({
            path: 'purchaseDetails',
            select: '-__v'
        })
        .populate({
            path: 'vendorDetails',
            select: '-__v'
        })
        .exec(function(err, items){
            payments = items.map(item => {
                var payment = {
                    amountRemaining: item.amountRemaining,
                    installments: item.installments,
                    purchase: item.purchaseDetails,
                    vendor: item.vendorDetails
                };
                return payment;
            });
            if(err || !payments)
                reject({
                    status: 404,
                    message: "Payments not found",
                    response: []
                });
            else
                resolve({
                    status: 200,
                    response: payments
                });
        });
    });
}

function findPendingPayment(){
    return new Promise((resolve, reject) => {
        Payment.find({
            amountRemaining : {
                $gte : 0
            } 
        },
        '-__v',
        function(err, pendings){
            if(err || !pendings)
                reject({
                    status: 404,
                    message: "No pending payments",
                    response: []
                });
            else
                resolve({
                    status: 200,
                    response: pendings
                });
        });
    });
}

function findPaymentInDateRange(begin, finish){
    return new Promise((resolve, reject) => {
        Payment.find({
            "installments.timestamp" : {
                $gte : begin,
                $lte : finish
            }
        },
        '-__v',
        function(err, onDates){
            if(err || !onDates)
                reject({
                    status: 404,
                    response: [],
                    message: "No payments made in between given dates"
                });
            else
                resolve({
                    status: 200,
                    response: onDates
                });
        });
    })
}

module.exports = { updatePayment, insertPayment, findPaymentByPurchaseID, findPaymentByVendorID, findPendingPayment, findPaymentInDateRange, findPaymentByDepartmentID, findPaymentByProductID };
