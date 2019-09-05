var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/',user_controller.index_signup);
router.post('/',user_controller.validationSignUp(),user_controller.post_signup);
module.exports = router;
