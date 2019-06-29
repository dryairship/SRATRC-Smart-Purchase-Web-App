const User = require('../models/user.js');

function insertUser(username, name, password, department, phone){
    return new Promise((resolve, reject) => {
        user = new User({
            username: username,
            name: name,
            password: password,
            department: department,
            phone: phone
        });
        user.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "User not registered"
                });
            else
                resolve({
                    status: 202,
                    response: "User registered successfully"
                });
        });
    });
}

function findUser(username){
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        },
        function(err, user){
            if(err || !user)
                reject({
                    status: 404,
                    response: "User not found"
                });
            else
                resolve({
                    status: 200,
                    response: user
                });
        });
    });
}


function updateUser(username, newUser){
    return new Promise((resolve, reject) => {
        User.updateOne({
            username: username
        },
        newUser,
        function(err, result){
            if(err)
                reject({
                    status: 500,
                    response: "A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status: 404,
                    response: "User not found"
                });
            else if(result.nModified == 0)
                resolve({
                    status: 200,
                    response: "User was already up-to-date"
                });
           else
                resolve({
                    status: 202,
                    response: "User successfully updated"
                });
        });
    });
}

module.exports = { insertUser, findUser, updateUser };
