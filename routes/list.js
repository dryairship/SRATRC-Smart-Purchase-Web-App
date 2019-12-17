const express = require('express');

const { handleListGet, handleDepartmentListPost } = require('../controllers/list.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.get('/:listID', handleListGet);
router.post('/departments', handleDepartmentListPost);

module.exports = router;
