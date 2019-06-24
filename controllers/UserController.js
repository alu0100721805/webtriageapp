var User = require('../models/User');

exports.index_login = function(req, res) {
    res.render('login');
}
exports.index_signup = function(req, res) {
    res.render('signup');
}
exports.post_signup = function(req, res) {

        let password = req.body.password;
        let password2 = req.body.password2;
      
        if (password == password2){
          let newUser = new User({
            userId: req.id,
            password: req.password,
            answer: req.answer,
            role: req.role
          });
          User.createUser(newUser, function(err, user){
            if(err) throw err;
            res.send(user).end();
          });
        } else{
          res.status(500).send("{errors: \"Las contraseñas no coinciden\"}").end()
        }

}