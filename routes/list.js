const express = require('express');

const { handleListGet } = require('../controllers/list.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.get('/:listID', handleListGet);

module.exports = router;
