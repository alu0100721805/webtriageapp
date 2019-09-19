const  UserService = require('../services/UserService');
const UserModel = require('../models/User');
const {validationResult} = require('express-validator');
const {body} = require('express-validator');

exports.validationEdit = function(){
  const val= [
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
    })
    ];
    return val;
}

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

exports.index_users = async function (req, res) {
  try {
    await UserService.findAllUser().then(async (users) => {
      if(users){
        res.render('users', { users: users });
      }
    });
    } catch(err){
      console.log(err)
    }
}
exports.post_delete = async function (req, res){
  try{
    const optionsToDel= req.data;
    console.log(optionsToDel);

  }catch (err){
    res.redirect('/users');
  }
}




exports.post_edit = async function (req, res) {
  try{
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
      throw errors;
    }
    const  userModel = new UserModel({
      userId: req.body.userId,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      role: req.body.role
     });
     console.log(userModel);
    await UserService.userEdit(userModel).then(() => {
       res.redirect('/users');
    })
    .catch( (err) => {
        throw err;
    });
  }catch (err){
    if('errors' in err){
       res.redirect('/users');
    } else {
       res.redirect('/users');
    }
  }
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
            password: req.body.password
           });

           await UserService.findUser(newUser.userId).then(async (dbUser) => {
            if(dbUser) throw {errors:[{msg:'¡Usuario ya existente!'}]};
      
            await UserService.create(newUser).then(user => {
              if(user) res.redirect('login');
            })
            .catch(err => {
              throw err;
            })
          });
           
        } catch (err){
          if('errors' in err){
            console.log(err);
            res.render('signup', { errors: err.errors});
          } else {
            res.render('signup', err);
          }
        }           
}
exports.post_signin = async function (req, res) {
  try {
    const { userId, password } = req.body;

    await UserService.findUser(userId).then(async (dbUser) => {
      if(!dbUser) throw {errors:[{msg:'¡Usuario no existente!'}]};

      await UserService.userValidation(dbUser, password).then( isValid => {
          if(isValid === true){
            res.redirect('triageManagement');
          }else {
            res.render('login',{message:'Acceso denegado'});
          }
        })
        .catch(err => {
          throw err;
        })
    });
    
    } catch(err){
        console.log(err);
        res.render('login',err);
    }       
 
}