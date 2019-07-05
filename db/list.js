const List = require('../models/list.js');

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
                    response: "List not found"
                });
            else
                resolve({
                    status: 200,
                    response: list
                });
        });
    });
}

module.exports = { findList };
