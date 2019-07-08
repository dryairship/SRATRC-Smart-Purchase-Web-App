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

module.exports = { insertDonation };
