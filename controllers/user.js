const { insertUser, findUser,  updateUser } = require('../db/user.js');
const { encryptPassword, checkPassword } = require('../utils/auth.js');
const { createSessionCookie, deleteSessionCookie } = require('../utils/session.js');

function handleUserPost(req, res) {
    var username = req.body.username,
        name = req.body.name,
        password = req.body.password,
        department = req.body.department,
        phone = req.body.phone;
    if(!username || !name || !password || !phone || !department)
        res.status(422).json("A required field is empty");
    else{
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
    if(req.body.department)
        newUser.department = req.body.department;
    if(req.body.phone)
        newUser.phone = req.body.phone;
    
    if(req.body.password){
        encryptPassword(req.body.password)
        .then(passwordHash => {
            newUser.password = passwordHash;
            return updateUser(req.user.username, newUser);
        })
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }else{
        updateUser(req.user.username, newUser)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function handleUserLogin(req, res){
    var user;
    findUser(req.body.user)
    .then(result => {
        user = result.response;
        return checkPassword(req.body.password, user.password);
    })
    .then(result => {
        sessionUser = {
            username: user.username,
            name: user.name,
            department: user.department,
            phone: user.phone
        };
        return createSessionCookie(sessionUser, req.body.remember);
    })
    .then(result => {
        res.cookie('sessionID', result.cookie.value, result.cookie.params).status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleUserLogout(req, res){
    return deleteSessionCookie(req.cookies.sessionID)
    .then(result => {
        res.cookie('sessionID', result.cookie.value, result.cookie.params).status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleCheckPassword(req, res){
    var user;
    findUser(req.user.username)
    .then(result => {
        user = result.response;
        return checkPassword(req.body.oldPassword, user.password) ;
    })
    .then(result => {
        res.status(result.status).json(result.response); 
    })
    .catch(error =>{
        res.status(error.status).json(error.respone);
    });
}

module.exports = { handleUserGet, handleUserPost, handleUserPatch, handleUserLogin, handleUserLogout, handleCheckPassword};
