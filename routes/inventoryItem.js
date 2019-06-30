const express = require('express');

const { handleInventoryItemPost, handleInventoryItemGetById, handleInventoryItemPatch, handleInventoryItemDelete, handleInventoryItemGetByProductId, handleInventoryItemGetByDepartmentId, handleTransferInventoryItem } = require('../controllers/inventoryItem.js');
const { validateUser, verifyDepartmentAfterValidation } = require('../utils/middlewares.js');

var router = express.Router();

router.use(validateUser);

router.post('/', handleInventoryItemPost);
router.get('/product/:productID', handleInventoryItemGetByProductId);
router.get('/department/:departmentID', handleInventoryItemGetByDepartmentId);
router.get('/:departmentID/:productID', handleInventoryItemGetById);
router.patch('/:departmentID/:productID', verifyDepartmentAfterValidation, handleInventoryItemPatch);
router.delete('/:departmentID/:productID', verifyDepartmentAfterValidation, handleInventoryItemDelete);
router.patch('/transfer', handleTransferInventoryItem);

module.exports = router;
