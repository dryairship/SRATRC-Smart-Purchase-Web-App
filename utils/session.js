const { insertSession, deleteSession } = require('../db/session.js');

function createSessionCookie(user, remember){
    var maxAge, expireAt;
    
    if(remember)
        maxAge = 30*24*60*60*1000;
    else
        maxAge = 24*60*60*1000;
    
    expireAt = Date.now() + maxAge;
    
    return new Promise((resolve, reject) => {
        insertSession(user, expireAt)
        .then(result => {
            resolve({
                status: 200,
                response: user,
                cookie: {
                    value: result.response,
                    params: {
                         maxAge: maxAge
                    }
                }
            });
        })
        .catch(error => {
            reject({
                status: 500,
                response: "Cannot create session cookie"
            })
        });
    });
}

function deleteSessionCookie(id){
    return new Promise((resolve, reject) => {
        deleteSession(id)
        .then(result => {
            resolve({
                status: 200,
                response: "User logged out successfully",
                cookie: {
                    value: "",
                    params: {
                         maxAge: 0
                    }
                }
            });
        })
        .catch(error => {
            reject({
                status: 500,
                response: "Cannot delete session cookie"
            })
        });
    });
}

module.exports = { createSessionCookie, deleteSessionCookie };
