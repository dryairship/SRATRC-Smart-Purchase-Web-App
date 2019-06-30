const express = require('express');

const { handleUserGet, handleUserPost, handleUserPatch, handleUserLogin, handleUserLogout } = require('../controllers/user.js');
const { checkAdmin, checkUserFromParams } = require('../utils/middlewares.js');

var router = express.Router();

router.get('/:userID', checkAdmin, handleUserGet);
router.patch('/:userID', checkUserFromParams, handleUserPatch);
router.post('/', checkAdmin, handleUserPost);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

module.exports = router;
