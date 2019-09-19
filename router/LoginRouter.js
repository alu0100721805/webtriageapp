var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/',user_controller.index_login);
router.get('/login',user_controller.index_login);
router.post('/login',user_controller.post_signin);

module.exports = router;
