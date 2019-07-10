const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var DonationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
    departmentID: String,
    productID: String,
    donor: String,
    quantity: {
        value: Number,
        unit: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    remarks: String
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

DonationSchema.virtual('productDetails', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true
});

var Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
