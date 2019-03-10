var express = require('express');
var router = express.Router();
var tag_controller = require('../controllers/TagController');

router.all('/', tag_controller.index_map_management);
router.get('/tag/:id', tag_controller.tag_findById_get);
router.get('/tag/:color', tag_controller.tag_findByColor_get);
router.post('/tag/create', tag_controller.tag_create_post);

module.exports = router;