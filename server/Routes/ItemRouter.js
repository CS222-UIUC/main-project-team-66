const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');

const router = require('express').Router();
router.post('/create', itemValidation, createItem);

module.exports = router;
