const express = require('express');

const { handleUserGet, handleUserPost, handleUserPatch } = require('../controllers/user.js')

var router = express.Router();

router.get('/:userID', handleUserGet);
router.patch('/:userID', handleUserPatch);
router.post('/', handleUserPost);

module.exports = router;
