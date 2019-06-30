const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var SessionSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            return uuidv4();
        }
    },
    user: {
        username: String,
        name: String,
        department: String,
        phone: String
    },
    expireAt: Date
});

SessionSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

var Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
