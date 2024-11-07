const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const {signup, login} = require('../Controllers/AuthController');
const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;