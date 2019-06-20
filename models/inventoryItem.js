const mongoose = require('mongoose')

var InventoryItemSchema = new mongoose.Schema({
    productID: String, 
    departmentID: String,
    amount: {
        quantity: Number,
        unit: String
    }
})

var InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = InventoryItem;