const {itemValidation} = require('../Middleware/ItemValidation');
const {createItem} = require('../Controllers/ItemCreate');
const {getItems} = require('../Controllers/GetItems');
const Auth = require('../Middleware/Auth')

const router = require('express').Router();
router.post('/create', Auth, itemValidation, createItem);
// router.get('/getitems', getItems);

router.get('/getitems', (req, res, next) => {
    console.log("GET /getitems route hit");
    next(); 
}, getItems);
  
module.exports = router;
