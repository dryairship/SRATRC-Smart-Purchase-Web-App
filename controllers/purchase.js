const { insertPurchase } = require('../db/purchase.js');
const { updatePayment, insertPayment } = require('../db/payment.js');
const { calculateTotalAmount } = require('../utils/amount.js');
const { updateInventoryItem, insertInventoryItem } = require('../db/inventoryItem.js')

function handlePurchasePost(req, res) {
    var departmentID = req.user.department,
        productID = req.body.productID,
        vendorID = req.body.vendorID,
        purchasedBy = req.user.username,
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
    if(!productID || !vendorID || !billNumber || !quantity.value || !quantity.unit || !rate.value || !rate.unit || !purchaseType || !remarks)
        res.status(422).json("A required field is empty");
    else{
        calculateTotalAmount(quantity, rate)
        .then(totalAmount => {
            amount = totalAmount;
            return insertPurchase(departmentID, productID, vendorID, purchasedBy, billNumber, quantity, rate, amount, purchaseType, remarks);
        })
        .then(purchaseID => {
            return insertPayment(purchaseID, vendorID, departmentID, productID, amount);
        })
        .then(result => {
            updateInventoryItem(productID, departmentID, quantity, 1)
            .then(result => {
                res.status(result.status).json(result.response);
                return result;
            })
            .catch(error => {
                if(error.status==404){
                    insertInventoryItem(productID, departmentID, quantity)
                    .then(result => {
                        res.status(result.status).json(result.response);
                        return;
                    })
                    .catch(error => {
                        res.status(error.status).json(error.response);    
                        return;
                    })
                }else{
                    res.status(error.status).json(error.response);
                    return;
                }
            });
        })
    }
}

module.exports = { handlePurchasePost };
