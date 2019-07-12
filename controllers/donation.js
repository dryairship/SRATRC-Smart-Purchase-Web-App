const { insertDonation, findAllDonationsByDepartmentId } = require('../db/donation.js');
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
    if(!productID || !donor || !quantity.value || !quantity.unit || !remarks || !timestamp)
        res.status(422).json("A required field is empty");
    else {
        var donationResult;
        insertDonation(departmentID, productID, donor, quantity, timestamp, remarks)
        .then(result => {
            donationResult = result;
            if(productID == 'money'){
                res.status(donationResult.status).json(donationResult.response);
                return;
            }
            updateInventoryItem(productID, departmentID, quantity, 1)
            .then(result => {
                res.status(donationResult.status).json(donationResult.response);
                return;
            })
            .catch(error => {
                if(error.status==404){
                    insertInventoryItem(productID, departmentID, quantity)
                    .then(result => {
                        res.status(donationResult.status).json(donationResult.response);
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
}


function handleDonationGetByDepartmentId(req, res) {
    findAllDonationsByDepartmentId(req.params.departmentID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleDonationPost, handleDonationGetByDepartmentId };
