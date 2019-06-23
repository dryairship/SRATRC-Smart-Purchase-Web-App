const mongoose = require('mongoose')

var InstallmentSchema = new mongoose.Schema({
    timestamp : {
        type : Date,
        default : Date.now
    },
    amount : Number,
    paidBy : String,
    remarks : String
});

var PaymentSchema = new mongoose.Schema({
    purchaseID : {
        type: String,
        ref: 'Purchase'
    },
    vendorID : {
        type: String,
        ref: 'Vendor'
    },
    installments : [InstallmentSchema],
    amountRemaining : Number
});

var Payment = mongoose.model('Payment',PaymentSchema)

module.exports = Payment;
