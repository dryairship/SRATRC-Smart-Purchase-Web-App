const Session = require('../models/session.js');

function insertSession(user, expireAt){
    return new Promise((resolve, reject) => {
        session = new Session({
            user: user,
            expireAt: expireAt
        });
        session.save(function(err){
            if(err)
                reject({
                    status: 500,
                    response: "Cannot insert session into database"
                });
            else
                resolve({
                    status: 200,
                    response: session._id
                });
        });
    });
}

module.exports = { insertSession };
