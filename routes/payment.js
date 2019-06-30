const express = require('express');

const { handlePayPost, handlePaymentGetByPurchaseID, handlePaymentGetByVendorID, handlePendingPayment, handlePaymentInPeriod } = require('../controllers/payment.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/:purchaseID', handlePayPost);
router.get('/id/:purchaseID', handlePaymentGetByPurchaseID);
router.get('/vendor/:vendorID', handlePaymentGetByVendorID);
router.get('/pending', handlePendingPayment);
router.get('/period', handlePaymentInPeriod);

module.exports = router;
