const express = require('express');

const { handleDonationPost, handleDonationGetByDepartmentId } = require('../controllers/donation.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleDonationPost);
router.get('/:departmentID', handleDonationGetByDepartmentId);

module.exports = router;
