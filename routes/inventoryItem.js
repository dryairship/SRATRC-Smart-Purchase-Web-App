const express = require('express');

const { handleInventoryItemPost, handleInventoryItemGetById, handleInventoryItemPatch, handleInventoryItemDelete } = require('../controllers/inventoryItem.js')

var router = express.Router() ;
 
router.post('/', handleInventoryItemPost);
router.get('/:departmentID/:productID', handleInventoryItemGetById);
router.patch('/:departmentID/:productID', handleInventoryItemPatch);
router.delete('/:departmentID/:productID', handleInventoryItemDelete);

module.exports = router;