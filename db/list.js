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

module.exports = { findList };
