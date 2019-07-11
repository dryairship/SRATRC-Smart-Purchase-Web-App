const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
var RequestSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
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
