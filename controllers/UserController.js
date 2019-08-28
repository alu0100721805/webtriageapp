var  UserService = require('../services/UserService');


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
          try {
            const createResult = await UserService.create(req.body);
            return res.status(201).json({ success: createResult });
          } catch (err) {
            if (err.name === 'ValidationError') {
              return res.status(400).json({ error: err.message });
            }
            return next(error);
          }
        } else{
          res.status(500).json({error: `Passwords doesn't match`});
        }

}