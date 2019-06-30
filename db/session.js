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

function deleteSession(id){
    return new Promise((resolve, reject) => {
        Session.findByIdAndDelete(
        id,
        function(err, session){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occured"
                });
            else if(!session)
                reject({
                    status: 404,
                    response: "Session to be deleted not found"
                });
            else
                resolve({
                    status: 202,
                    response: "Session succesfully deleted"
                });
        });
    });
}

function findSessionByID(id){
    return new Promise((resolve, reject) => {
        Session.findById(
        id,
        function(err, session){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occured while verifying session"
                });
            else if(!session)
                reject({
                    status: 403,
                    response: "User not logged in"
                });
            else
                resolve(session.user);
        });
    });
}

module.exports = { insertSession , deleteSession, findSessionByID };
