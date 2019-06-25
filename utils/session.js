const { insertSession } = require('../db/session.js');

function createSessionCookie(user, remember){
    var maxAge, expireAt;
    
    if(remember)
        maxAge = 30*24*60*60*1000;
    else
        maxAge = 24*60*60*1000;
    
    expireAt = Date.now() + maxAge;
    
    return new Promise((resolve, reject) => {
        insertSession(user.username, expireAt)
        .then(result => {
            resolve({
                status: 200,
                response: "User logged in successfully",
                cookie: {
                    value: result.response,
                    params: {
                         maxAge: maxAge,
                         httpOnly: true
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

module.exports = { createSessionCookie };
