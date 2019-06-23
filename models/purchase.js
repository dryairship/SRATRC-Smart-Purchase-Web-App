const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var PurchaseSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
    departmentID: String,
    productID: {
        type: String,
        ref: 'Product'
    },
    vendorID: {
        type: String,
        ref: 'Vendor'
    },
    purchasedBy: String,
    billNumber: String,
    quantity: {
        value: Number,
        unit: String
    },
    rate: {
        value: Number,
        unit: String
    },
    totalAmount: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    purchaseType: {
        type: String,
        enum: ['ad-hoc', 'planned']
    },
    remarks: String
});

var Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
