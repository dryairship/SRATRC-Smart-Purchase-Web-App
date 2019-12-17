const List = require('../models/list.js');
const uuidv4 = require('uuid/v4');

function findList(listID){
    return new Promise((resolve, reject) => {
        List.findOne({
            _id: listID
        },
        '-__v',
        function(err, list){
            if(err || !list)
                reject({
                    status: 404,
                    message: "List not found",
                    response: {
                      _id: 'null',
                      items: []
                    }
                });
            else
                resolve({
                    status: 200,
                    response: list
                });
        });
    });
}

function insertDepartment(deptName){
    var dvalue = uuidv4();
    return new Promise((resolve, reject) => {
        List.updateOne({
            _id: "departments"
        },
        {
            $push: {
                items: {
                    value: dvalue,
                    label: deptName
                }
            }
        },
        function(err, result){
            if(err)
                reject({
                    status : 500,
                    response : "A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status : 404,
                    response : "Couldn't create department"
                });
            else
                resolve({
                    status : 202,
                    response : "Successfully created department"
                });
        });
    });
}

module.exports = { findList, insertDepartment };
