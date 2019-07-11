const mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
    _id: Number,
    departmentID: String,
    productID: String,
    quantity: {
        value: Number,
        unit: String
    },
    quantityRemaining: {
        value: Number,
        unit: String
    },
    timestamp: Date
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RequestSchema.virtual('productDetails', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true
});

var Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
