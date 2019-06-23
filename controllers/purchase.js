const { insertPurchase } = require('../db/purchase.js');
const { updatePayment, insertPayment } = require('../db/payment.js');

function handlePurchasePost(req, res) {
    var departmentID = req.body.departmentID,
        productID = req.body.productID,
        vendorID = req.body.vendorID,
        purchasedBy = req.body.purchasedBy,
        billNumber = req.body.billNumber,
        quantity = {
            value: req.body.qValue,
            unit: req.body.qUnit
        },
        rate = {
            value: req.body.rValue,
            unit: req.body.rUnit
        },
        totalAmount = quantity.value*rate.value, /* TODO: FIX THIS WHEN UTILS PACKAGE HAS BEEN CREAATED */
        purchaseType = req.body.purchaseType,
        remarks = req.body.remarks;
    
    insertPurchase(departmentID, productID, vendorID, purchasedBy, billNumber, quantity, rate, totalAmount, purchaseType, remarks)
    .then(purchaseResult => {
        insertPayment(purchaseResult, vendorID, totalAmount)
        .then(paymentResult => {
            res.status(paymentResult.status).json(paymentResult.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handlePurchasePost };
