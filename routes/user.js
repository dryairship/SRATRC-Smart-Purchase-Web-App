const express = require('express');

const { handleUserGet, handleUserPost, handleUserPatch, handleUserLogin, handleUserLogout } = require('../controllers/user.js');

var router = express.Router();

router.get('/:userID', handleUserGet);
router.patch('/:userID', handleUserPatch);
router.post('/', handleUserPost);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

module.exports = router;
