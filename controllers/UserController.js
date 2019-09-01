const  UserService = require('../services/UserService');
const { validationResult} = require('express-validator');
const {body} = require('express-validator');
const {check} = require('express-validator');

exports.validationSignUp =  function() {
  const valSignUp = [
    body('userId').custom ((value) => {
      const regexp = /^([0-4][0-9]|[5][0-2])([0-4][0-9]|[5][0-2])[0-9]{5}$/i;
      if(value === ''){
        throw new Error('¡El número de colegiado no debe estar vacío!');
      }else if (value.length !== 9){
        throw new Error('¡El número de colegiado debe tener 9 dígitos!');
      }else if(regexp.test(value)){
          return true;
      } else {
          throw new Error('¡EL número de colegiado no es válido!');
      }
    }),
    body('name').custom((value) => {
      const regexp = /^([a-z ñáéíóú]{2,60})$/i;
      if(value === ''){
        throw new Error('¡El nombre no debe estar vacío!');
      }
      if(regexp.test(value)) return true;
      else  throw new Error('¡El nombre no es válido!');
    }),
    body('surname').custom((value) => {
      const regexp = /^([a-z ñáéíóú]{2,60})$/i;
      if(value === ''){
        throw new Error('¡El apellido no debe estar vacío!');
      }
      if(regexp.test(value)) return true;
      else  throw new Error('¡El apellido no es válido!');
    }),
    check('answer','¡La palabra de recuperación es necesaria!').not().isEmpty(),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password && value !== '' && req.body.password !== '') {
          throw new Error('¡La contraseña de confirmación no coincide con la contraseña!');
        }
        return true;
      })
    ];
    return valSignUp;
}


exports.index_login = async function(req, res) {
    res.render('login');
}
exports.index_signup = async  function(req, res) {
    res.render('signup');
}

exports.post_signup = async function (req, res) {
   
    try{
        const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw errors;
          }
          result = await UserService.create(req.body);
           res.redirect('login');
        } catch (errors){
          if('errors' in errors){
            res.render('signup', { errors: errors.array()});
          } else {
            res.render('signup', errors);
          }
        }           
}