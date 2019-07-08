const mongoose = require('mongoose');

var InstallmentSchema = new mongoose.Schema({
    timestamp : {
        type : Date,
        default : Date.now
    },
    amount : Number,
    paidBy : String,
    remarks : String
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

var PaymentSchema = new mongoose.Schema({
    purchaseID : String,
    vendorID : String,
    departmentID: String,
    productID: String,
    installments : [InstallmentSchema],
    amountRemaining : Number
});

PaymentSchema.virtual('purchaseDetails', {
    ref: 'Purchase',
    localField: 'purchaseID',
    foreignField: '_id',
    justOne: true
});

PaymentSchema.virtual('vendorDetails', {
    ref: 'Vendor',
    localField: 'vendorID',
    foreignField: '_id',
    justOne: true
});

PaymentSchema.virtual('productDetails', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true
});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
