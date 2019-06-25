const express = require('express');

const { handleUserGet, handleUserPost, handleUserPatch, handleUserLogin } = require('../controllers/user.js')

var router = express.Router();

router.get('/:userID', handleUserGet);
router.patch('/:userID', handleUserPatch);
router.post('/', handleUserPost);
router.post('/login', handleUserLogin);

module.exports = router;
