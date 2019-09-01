var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');
const {body} = require('express-validator');
const {check} = require('express-validator');

router.get('/',user_controller.index_signup);
router.post('/',[
    check('userId','¡El número del colegiado debe tener exactamente 7 dígitos!').isLength({max:7,min:7}),
    check('answer','¡La palabra de recuperación es necesaria!').not().isEmpty(),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password && value !== '' && req.body.password !== '') {
          throw new Error('¡La contraseña de confirmación no coincide con la contraseña!');
        }
        return true;
      }),
    ],user_controller.post_signup);


module.exports = router;