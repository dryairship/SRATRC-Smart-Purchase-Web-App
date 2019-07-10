const { insertSession, deleteSession, findSessionByID } = require('../db/session.js');

const validateUser = function validateUser(req, res, next) {
    findSessionByID(req.cookies.sessionID)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
};

const checkAdmin = function checkAdmin(req, res, next) {
    findSessionByID(req.cookies.sessionID)
    .then(user => {
        req.user = user;
        if(user.username == "admin")
            next();
        else
            res.status(403).json("Not logged in as administrator");
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
};

const checkUserFromParams = function checkUserFromParams(req, res, next) {
    findSessionByID(req.cookies.sessionID)
    .then(user => {
        req.user = user;
        if(user.username == req.params.userID)
            next();
        else
            res.status(403).json("This user cannot access this resource");
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
};

const verifyDepartmentAfterValidation = function verifyDepartmentAfterValidation(req, res, next) {
    if(req.user.department == req.params.departmentID)
        next();
    else
        res.status(403).json("This user cannot access this resource");
};

module.exports = { validateUser, checkAdmin, checkUserFromParams, verifyDepartmentAfterValidation };
