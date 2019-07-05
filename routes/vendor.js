const express = require('express');

const { handleVendorPost, handleVendorGetById, handleVendorDelete, handleVendorUpdate, handleVendorGetAll } = require('../controllers/vendor.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleVendorPost);
router.get('/', handleVendorGetAll);
router.get('/:vendorID', handleVendorGetById);
router.patch('/:vendorID', handleVendorUpdate);
router.delete('/:vendorID', handleVendorDelete);

module.exports = router;
