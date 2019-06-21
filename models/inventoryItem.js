const mongoose = require('mongoose')

var InventoryItemSchema = new mongoose.Schema({
    productID: String, 
    departmentID: String,
    quantity: {
        value: Number,
        unit: String
    }
})

var InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = InventoryItem;