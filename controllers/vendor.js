const { insertVendor, findVendorById, deleteVendor, updateVendor, findAllVendors } = require('../db/vendor.js');

function handleVendorPost(req, res){
    var name = req.body.name,
        contactPerson = req.body.contactPerson,
        address = req.body.address,
        phone = req.body.phone,
        email = req.body.email
    if(!name || !address || !contactPerson || !phone || !email)
        res.status(422).json("A required field is empty");
    else{
        insertVendor(name,contactPerson,address,phone,email)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function handleVendorGetById(req, res){
    findVendorById(req.params.vendorID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleVendorDelete(req, res){
    deleteVendor(req.params.vendorID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleVendorUpdate(req, res){
    var newVendor = {};
    if(req.body.name)
        newVendor['name'] = req.body.name;
    if(req.body.contactPerson)
        newVendor['contactPerson'] = req.body.contactPerson;
    if(req.body.address)
        newVendor['address'] = req.body.address;
    if(req.body.phone)
        newVendor['phone'] = req.body.phone;
    if(req.body.email)
        newVendor['email'] = req.body.email;

    updateVendor(req.params.vendorID, newVendor)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function handleVendorGetAll(req, res) {
    findAllVendors()
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

module.exports = { handleVendorPost, handleVendorGetById, handleVendorDelete, handleVendorUpdate, handleVendorGetAll };
