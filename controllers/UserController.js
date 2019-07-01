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
            userId: req.body.id,
            password: req.body.password,
            answer: req.body.answer,
            role: req.body.role
          });
          User.create(newUser, function(err, user){
            if(err) throw err;
            res.send(user).end();
          });
        } else{
          res.status(500).send("{errors: \"Las contraseñas no coinciden\"}").end()
        }

}