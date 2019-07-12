const Donation = require('../models/donation.js');

function insertDonation(departmentID, productID, donor, quantity, timestamp, remarks){
    return new Promise((resolve, reject) => {
        donation = new Donation({
            departmentID: departmentID,
            productID: productID,
            donor: donor,
            quantity: quantity,
            timestamp: timestamp,
            remarks: remarks
        });
        
        donation.save(function(err){
            if(err)
                reject({
                    status: 400, 
                    response: "Could not insert donation"
                });
            else
                resolve({
                    status: 201,
                    response: "Successfully added donation"
                });
        });
    });
}

function findAllDonationsByDepartmentId(departmentID){
    return new Promise((resolve, reject) => {
        Donation.find({
            departmentID: departmentID
        },
        '-__v')
        .populate({
            path: 'productDetails',
            select: '-__v'
        })
        .exec(function(err, donations){
            if(!donations){
                reject({
                    status: 404,
                    response: [],
                    message: "No donations found for this department"
                });
            }else{
                resolve({
                    status: 200,
                    response: donations
                });
            }
        });
    });
}

module.exports = { insertDonation, findAllDonationsByDepartmentId };
