const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var VendorSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
    name: String,
    contactPerson: String,
    address: String,
    phone : String,
    email : String
});

var Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;