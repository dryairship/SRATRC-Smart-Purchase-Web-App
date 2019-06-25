const bcrypt = require('bcrypt');

function encryptPassword(plaintext) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(
            plaintext,
            global.auth.saltRounds,
            function(err, hash){
                if(err)
                    reject({
                        status: 500,
                        response: "Server error"
                    });
                else
                    resolve(hash);
            }
        );
    });
}

function checkPassword(plaintext, correctHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(
            plaintext,
            correctHash,
            function(err, matched){
                if(err)
                    reject({
                        status: 500,
                        response: "Server error"
                    });
                else if (matched)
                    resolve({
                        status: 200,
                        response: "Password matched"
                    });
                else
                    reject({
                        status: 403,
                        response: "Incorrect password"
                    });
            }
        );
    });
}

module.exports = { encryptPassword, checkPassword };
