const mongoose = require('mongoose');

const config = require('../config/config.js');

class DBConnection {
    static dial() {
        if ( this.db )
            return Promise.resolve(this.db);
        
        mongoose.connect(global.database.dialURL, this.options);
        this.db = mongoose.connection;
        
        this.db.on('error', console.error.bind(console, '[ERROR] [MongoDB]'));
    }
}

DBConnection.db = null
DBConnection.options = {
    auth: {
        authSource: global.database.name
    },
    dbName: global.database.name,
    user: global.database.username,
    pass: global.database.password,
    useNewUrlParser: true
}

module.exports = DBConnection
