var User = require("../models/User");

exports.user_login_get = function(req,res){
  res.render('login');
  
}