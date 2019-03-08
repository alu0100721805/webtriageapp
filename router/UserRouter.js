var express = require('express');
var router = express.Router();
var user_controller_ = require('../controllers/UserController');


router.get('/login*',user_controller_.user_login_get);

module.exports = router;