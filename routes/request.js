const express = require('express');

const { handleRequestGetById, handleRequestGetAll, handleRequestPost, handleRequestPatch, handleRequestDelete } = require('../controllers/request.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleRequestPost);
router.get('/', handleRequestGetAll);
router.get('/:requestID', handleRequestGetById);
router.patch('/:requestID', handleRequestPatch);
router.delete('/:requestID', handleRequestDelete);

module.exports = router;
