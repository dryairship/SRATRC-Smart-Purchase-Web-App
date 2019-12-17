const { findList, insertDepartment } = require('../db/list.js');

function handleListGet(req, res){
    findList(req.params.listID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleDepartmentListPost(req, res){
    insertDepartment(req.body.name)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleListGet, handleDepartmentListPost };
