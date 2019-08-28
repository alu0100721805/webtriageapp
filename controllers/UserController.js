var  UserService = require('../services/UserService');
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.index_login = async function(req, res) {
    res.render('login');
}
exports.index_signup = async  function(req, res) {
    res.render('signup');
}
exports.post_signup = async function(req, res) {

        const password = req.body.password;
        const password2 = req.body.password2;
        if (password === password2){
      
            const createResult = await UserService.create(req.body).catch((error)=> {
              console.log("Error al crear usuario", JSON.stringify(error));});
            res.status(201).send(JSON.stringify(createResult));
            
          }

}