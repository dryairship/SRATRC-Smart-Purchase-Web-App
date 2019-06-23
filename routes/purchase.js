const express = require('express');

const { handlePurchasePost } = require('../controllers/purchase.js');

var router = express.Router();

router.post('/', handlePurchasePost);

module.exports = router;
