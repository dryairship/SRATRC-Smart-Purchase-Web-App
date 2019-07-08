const express = require('express');

const { handleDonationPost } = require('../controllers/donation.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleDonationPost);

module.exports = router;
