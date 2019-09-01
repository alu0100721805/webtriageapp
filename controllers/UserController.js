const  UserService = require('../services/UserService');
const { validationResult} = require('express-validator');

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
          try{
            result = await UserService.create(req.body);
          }catch (DbErrors){
            console.log('ERROR', JSON.parse(JSON.stringify(DbErrors)));
            let message = '';
            if( DbErrors.name === 'ValidationError'){
                if ( 'userId' in DbErrors.errors){
                 message = DbErrors.errors.userId.message;
                }
            }
            if(message !== ''){
              res.render('signup', {errors: [{ msg: message}] });
            } else {
              res.render('signup', DbErrors);
            }
            
          }  
          
        } catch (errors){
          console.log(errors,JSON.parse(JSON.stringify(errors)));
          res.render('signup', { errors: errors.array()});
        }
                  
}