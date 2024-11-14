const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');
const {getItems} = require('../Controllers/GetItems');
const Auth = require('../Middleware/Auth')

const router = require('express').Router();
router.post('/create', Auth, createItem);
router.get('/getitems', getItems);
  
module.exports = router;
