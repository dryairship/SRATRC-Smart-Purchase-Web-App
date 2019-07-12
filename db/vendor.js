const Vendor = require('../models/vendor.js');

function insertVendor(name, contactPerson, address, phone, email){
    return new Promise((resolve, reject) => {
        vendor = new Vendor({
            name: name,
            contactPerson: contactPerson,
            address: address,
            phone: phone,
            email: email
        });
        vendor.save(function(err){
            if(err)
                reject({
                    status: 400,
                    response: "Vendor not created"
                });
            else
                resolve({
                    status: 202,
                    response: vendor._id
                });
        });
    });
}

function findVendorById(id){
    return new Promise((resolve, reject) => {
        Vendor.findOne({
            _id: id
        },
        '-__v',
        function(err, vendor){
            if(err || !vendor)
                reject({
                    status: 404,
                    response: "Vendor not found"
                });
            else
                resolve({
                    status: 200,
                    response: vendor
                });
        });
    });
}

function deleteVendor(id){
    return new Promise((resolve, reject) => {
        Vendor.findByIdAndDelete(
        id,
        function(err,vendor){
            if(err)
                reject({status : 500,
                        response : "A server error occurred"});
            else if(!vendor)
                reject({status : 404,
                        response : "Vendor to be deleted was not found"});
            else
                resolve({status : 202,
                        response : "Vendor successfully deleted"});
        });
    });
}


function updateVendor(id, newVendor){
    return new Promise((resolve, reject) => {
        Vendor.updateOne({
            _id : id
        },
        newVendor,
        function(err, result) {
            if(err)
                reject({
                    status:500,
                    response: " A server error occurred"
                });
            else if(result.n == 0)
                reject({
                    status : 404,
                    response : "Vendor not found"
                });
            else if(result.nModified == 0)
                reject({
                    status : 200,
                    response : "Vendor details upto date"
                });
            else
                resolve({
                    status : 202,
                    response : " Vendor successfully updated"
                });
        });
    });
}

function findAllVendors(){
    return new Promise((resolve, reject) => {
        Vendor.find(
        null,
        '-__v',
        function(err, vendors){
            if(err || !vendors )
                reject({
                    status: 404,
                    response: [],
                    message: "No vendors found"
                });
            else
                resolve({
                    status: 200,
                    response: vendors
                });
        });
    });
}


module.exports = { insertVendor, findVendorById, deleteVendor, updateVendor, findAllVendors };
