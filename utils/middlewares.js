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

module.exports = { validateUser };
