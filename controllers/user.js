const { insertUser, findUser,  updateUser } = require('../db/user.js');
const { encryptPassword, checkPassword } = require('../utils/auth.js');
const { createSessionCookie } = require('../utils/session.js');

function handleUserPost(req, res) {
    var username = req.body.username,
        name = req.body.name,
        password = req.body.password,
        department = req.body.department,
        phone = req.body.phone;
    
    encryptPassword(password)
    .then(passwordHash => {
        return insertUser(username, name, passwordHash, department, phone)
    })
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleUserGet(req, res) {
    findUser(req.params.userID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleUserPatch(req, res){
    var newUser = {};
    if(req.body.name) 
        newUser.name = req.body.name;
    if(req.body.password)
        newUser.password = req.body.password;
    if(req.body.department)
        newUser.department = req.body.department;
    if(req.body.phone)
        newUser.phone = req.body.phone;
    
    updateUser(req.params.userID, newUser)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleUserLogin(req, res){
    var user;
    findUser(req.body.user)
    .then(result => {
        user = result.response;
        return checkPassword(req.body.password, user.password);
    })
    .then(result => {
        return createSessionCookie(user, req.body.remember);
    })
    .then(result => {
        res.cookie('sessionID', result.cookie.value, result.cookie.params).status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleUserGet, handleUserPost, handleUserPatch, handleUserLogin };
