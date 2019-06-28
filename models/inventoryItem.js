const mongoose = require('mongoose');

var InventoryItemSchema = new mongoose.Schema({
    productID: String,
    departmentID: String,
    quantity: {
        value: Number,
        unit: String
    }
},
{
    toJSON: { virtuals: true } 
});

InventoryItemSchema.virtual('details', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true
});

var InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = InventoryItem;
