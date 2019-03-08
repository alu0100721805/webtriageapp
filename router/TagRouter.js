var express = require('express');
var router = express.Router();
var tag_controller = require('../controllers/TagController');

router.get('/:id', tag_controller.tag_findById_get);
router.get('/:color', tag_controller.tag_findByColor_get);
router.post('/create', tag_controller.tag_create_post);
router.post('/read', tag_controller.tag_findById_post);
router.get('/*',[tag_controller.tag_findById_get,tag_controller.tag_findByColor_get,tag_controller.tag_index_get]);

module.exports = router;