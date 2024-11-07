const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');
const {getItems} = require('../Controllers/GetItems');
const {getUserItems } = require('../Controllers/UserItems');
const Auth = require('../Middleware/Auth');

const router = require('express').Router();
router.post('/create', Auth, itemValidation, createItem);
router.get('/getitems', getItems);
router.get('/getuseritems', Auth, getUserItems);
module.exports = router;
