var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');
var tag_controller = require('../controllers/TagController');

router.all('/tag', tag_controller.index_map_management);
router.get('/tag/:id', tag_controller.tag_findById_get);
router.get('/tag/:colour', tag_controller.tag_findByColour_get);
router.post('/tag/create', tag_controller.tag_create_post);
router.get('/login',user_controller.index_login);
router.get('/signup',user_controller.index_signup);
router.post('/signup',user_controller.post_signup);


module.exports = router;