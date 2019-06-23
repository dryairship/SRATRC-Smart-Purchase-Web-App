const Purchase = require('../models/purchase.js');
const Payment = require('../models/payment.js');

function insertPurchase(departmentID, productID, vendorID, purchasedBy, billNumber, quantity, rate, totalAmount, purchaseType, remarks){
    return new Promise((resolve, reject) => {
        purchase = new Purchase({
            departmentID: departmentID,
            productID: productID,
            vendorID: vendorID,
            purchasedBy: purchasedBy,
            billNumber: billNumber,
            quantity: quantity,
            rate: rate,
            totalAmount: totalAmount,
            purchaseType: purchaseType,
            remarks: remarks
        });
        
        purchase.save(function(err){
            if(err)
                reject({
                    status: 400, 
                    response: "Could not purchase item"
                });
            else
                resolve(purchase._id);
        });
    });
}

module.exports = { insertPurchase };
