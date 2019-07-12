const { updatePayment, insertPayment, findPaymentByPurchaseID, findPaymentByVendorID, findPaymentByDepartmentID, findPendingPayment, findPaymentInDateRange, findPaymentByProductID } = require('../db/payment.js');

function handlePayPost(req, res){
    var amount = req.body.amount;
    var paidBy = req.user.username;
    var remarks = req.body.remarks;
    var timestamp = Date.parse(req.body.timestamp);
    if(!amount || !remarks || !timestamp)
        res.status(422).json("A required field is empty");
    else{
        updatePayment(req.params.purchaseID, amount, paidBy, remarks, timestamp)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function handlePaymentGetByPurchaseID(req, res){
    findPaymentByPurchaseID(req.params.purchaseID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handlePaymentGetByVendorID(req, res){
    findPaymentByVendorID(req.params.vendorID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });    
}

function handlePaymentGetByDepartmentID(req, res){
    findPaymentByDepartmentID(req.params.departmentID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handlePaymentGetByProductID(req, res){
    findPaymentByProductID(req.params.productID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handlePendingPayment(req, res){
    findPendingPayment()
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handlePaymentInPeriod(req, res){
    var begin = Date.parse(req.body.begin);
    var finish = Date.parse(req.body.finish);

    findPaymentInDateRange(begin, finish)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handlePayPost, handlePaymentGetByPurchaseID, handlePaymentGetByVendorID, handlePendingPayment, handlePaymentInPeriod, handlePaymentGetByDepartmentID, handlePaymentGetByProductID };
