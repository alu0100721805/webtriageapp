var express = require('express');
var router = express.Router();
var user_controller_ = require('../controllers/UserController');

router.all('/', user_controller_.index_login);
router.all('/Registrarse', user_controller_.index_registro);
module.exports = router;