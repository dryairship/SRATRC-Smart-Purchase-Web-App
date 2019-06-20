const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    password: String,
    department: String,
    phone: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
