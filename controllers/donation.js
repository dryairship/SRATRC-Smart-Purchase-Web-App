const { insertDonation } = require('../db/donation.js');
const { insertInventoryItem } = require('../db/inventoryItem.js');

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
        donationResult = result
        return insertInventoryItem(productID, departmentID, quantity);
    })
    .then(result => {
        res.status(donationResult.status).json(donationResult.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleDonationPost };
