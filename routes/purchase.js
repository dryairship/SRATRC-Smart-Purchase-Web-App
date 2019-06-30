const express = require('express');

const { handlePurchasePost } = require('../controllers/purchase.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handlePurchasePost);

module.exports = router;
