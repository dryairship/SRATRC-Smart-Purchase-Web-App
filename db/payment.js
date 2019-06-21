const Payment = require('../models/payment.js')

function updatePayment(purchaseID, amount, paidBy, remarks, time){
    return new Promise((resolve, reject) => {
        var installmentDetails = {
            time : time,
            amount : amount,
            paidBy : paidBy,
            remarks : remarks
        };

        Payment.updateOne({
            _id: purchaseID
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
                    response : " A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status : 404,
                    response : "invalid purchaseID"
                });
            else
                resolve({
                    status : 202,
                    response : " Payment successfully done"
                });
        });
    });
}

function insertPayment(purchaseID, vendorID, totalAmount){
    return new Promise((resolve, reject) => {
        payment = new Payment({
            purchaseID : purchaseID,
            vendorID : vendorID,
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
                    response: "Payment successfully created"
                });
    	});
    });
}

module.exports = { updatePayment, insertPayment };