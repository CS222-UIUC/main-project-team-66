const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');
const Auth = require('../Middleware/Auth')

const router = require('express').Router();
router.post('/create', Auth, itemValidation, createItem);

module.exports = router;
