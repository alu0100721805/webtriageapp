var express = require('express');
var router = express.Router();
var user_controller_ = require('../controllers/UserController');

router.all('/', user_controller_.index_login);
router.get('/signup', user_controller_.index_signup);
router.get('/login',user_controller_.index_login);

module.exports = router;