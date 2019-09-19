var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/', user_controller.index_users);
router.post('/edit',user_controller.validationEdit(), user_controller.post_edit);
router.post('/delete', user_controller.post_delete);

module.exports = router;