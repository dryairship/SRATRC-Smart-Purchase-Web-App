const { insertDonation } = require('../db/donation.js');
const { updateInventoryItem, insertInventoryItem } = require('../db/inventoryItem.js');

function handleDonationPost(req, res) {
    var departmentID = req.user.department,
        productID = req.body.productID,
        donor = req.body.donor,
        quantity = {
            value: req.body.qValue,
            unit: req.body.qUnit
        },
        timestamp = Date.parse(req.body.timestamp),
        remarks = req.body.remarks,
        amount;
    
    var donationResult;
    insertDonation(departmentID, productID, donor, quantity, timestamp, remarks)
    .then(result => {
        updateInventoryItem(productID, departmentID, quantity.value)
        .then(result => {
            res.status(result.status).json(result.response);
            return;
        })
        .catch(error => {
            if(error.status==404){
                insertInventoryItem(productID, departmentID, quantity)
                .then(result => {
                    res.status(result.status).json(result.response);
                    return;
                })
                .catch(error => {
                    res.status(error.status).json(error.response);    
                    return;
                })
            }else{
                res.status(error.status).json(error.response);
                return;
            }
        });
    })
}

module.exports = { handleDonationPost };
