const express = require('express');

const { handlePayPost, handlePaymentGetByPurchaseID, handlePaymentGetByVendorID, handlePendingPayment, handlePaymentInPeriod } = require('../controllers/payment.js');

var router = express.Router();

router.patch('/:purchaseID', handlePayPost);
router.get('/id/:purchaseID', handlePaymentGetByPurchaseID);
router.get('/vendor/:vendorID', handlePaymentGetByVendorID);
router.get('/pending', handlePendingPayment);
router.get('/period', handlePaymentInPeriod);

module.exports = router;