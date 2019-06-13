const express = require('express');

const { handleProductGet, handleProductPost } = require('../controllers/product.js')

var router = express.Router();

router.post('/', handleProductPost);
router.get('/:productID', handleProductGet);

module.exports = router;
