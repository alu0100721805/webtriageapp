var express = require('express');
var router = express.Router();
var tag_controller = require('../controllers/TriageManagementController');


router.get('/tag/:id', tag_controller.tag_findById_get);
router.get('/tag/:colour', tag_controller.tag_findByColour_get);
router.post('/tag/create', tag_controller.tag_create_post);
router.all('/', tag_controller.index_map_management);

module.exports = router;