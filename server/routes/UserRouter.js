const { getAllUsers } = require('../Controllers/UserController');

const router = require('express').Router();

router.get('/allUsers', getAllUsers);
  
module.exports = router;