const mongoose = require('mongoose')

var InstallmentSchema = new mongoose.Schema({
	Time : { 
		type : Date 
		default : Date.now 
	},
	amount : Number,
	paidBy : String,
	remarks : String
});

var PaymentSchema = new mongoose.Schema({
	purchaseID : String,
	vendorID : String,
	installments : [InstallmentSchema],
	amountRemaining : Number
});

var Payment = mongoose.model('Payment',PaymentSchema)

module.exports = Payment;