const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var ListSchema = new mongoose.Schema({
    _id: String,
    items: [{
        value: String,
        label: String
    }]
});

var List = mongoose.model('List', ListSchema);

module.exports = List;
