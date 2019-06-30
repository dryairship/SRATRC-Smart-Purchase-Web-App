const { insertPurchase } = require('../db/purchase.js');
const { updatePayment, insertPayment } = require('../db/payment.js');
const { calculateTotalAmount } = require('../utils/amount.js');

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
        purchaseType = req.body.purchaseType,
        remarks = req.body.remarks,
        amount;
    
    calculateTotalAmount(quantity, rate)
    .then(totalAmount => {
        amount = totalAmount;
        return insertPurchase(departmentID, productID, vendorID, purchasedBy, billNumber, quantity, rate, amount, purchaseType, remarks);
    })
    .then(purchaseID => {
        return insertPayment(purchaseID, vendorID, amount);
    })
    .then(result => {
        return res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handlePurchasePost };
