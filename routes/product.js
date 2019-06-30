const express = require('express');

const { handleProductGetById, handleProductGetAll, handleProductPost, handleProductPatch, handleProductDelete } = require('../controllers/product.js');
const { validateUser } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleProductPost);
router.get('/', handleProductGetAll);
router.get('/:productID', handleProductGetById);
router.patch('/:productID', handleProductPatch);
router.delete('/:productID', handleProductDelete);

module.exports = router;
