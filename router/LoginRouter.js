var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/',user_controller.index_login);
router.post('/',user_controller.post_signin);

module.exports = router;
