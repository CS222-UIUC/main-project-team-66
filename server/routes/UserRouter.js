const { getAllUsers } = require('../Controllers/UserController');
const {addToCart, removeFromCart, clearCart, getCart} = require('../Controllers/CartController');
const Auth = require('../Middleware/Auth')

const router = require('express').Router();

router.get('/allUsers', getAllUsers);
router.post('/addtocart', Auth, addToCart);
router.post('/removeitemfromcart',  Auth, removeFromCart);
router.post('/clearcart', Auth, clearCart);
router.get('/getcart', Auth, getCart);

  
module.exports = router;