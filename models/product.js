const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var ProductSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
    name: String,
    category: String,
    description: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
