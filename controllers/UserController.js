const  UserService = require('../services/UserService');
const UserModel = require('../models/User');
const {validationResult} = require('express-validator');
const {body} = require('express-validator');
const {check} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const jwtKey = config.app.TOKEN_SECRET;
const jwtExpirySeconds = config.app.TOKEN_EXP;

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
          const  newUser = new UserModel({
            userId: req.body.userId,
            name: req.body.name,
            surname: req.body.surname,
            password: req.body.password,
            answer: req.body.answer,
            role: req.body.role
           });
            const result =  UserService.create(newUser);
            if(!result) {
              throw {errors:[{msg:'¡No se ha podido crear el usuario!'}]};  
            }
           res.redirect('login');
        } catch (err){
          if('errors' in err){
            console.log(err);
            res.render('signup', { errors: err.errors});
          } else {
            res.render('signup', err);
          }
        }           
}
exports.post_signin = function (req, res) {
  try {
    const { userId, password } = req.body;
    UserService.userValidation(userId,password).then( isValid => {
      console.log("ES VALIDO", isValid);
        if(isValid === true){
          res.redirect('tag');
        }else {
          res.render('login',{message:'Acceso denegado'});
        }
      })
    }catch(err){
        console.log(err);
        res.render('login',err);
    }       
 
}