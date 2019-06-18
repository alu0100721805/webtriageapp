var User = require("../models/User");

exports.index_login = function(req, res) {
    res.render('login');
}
exports.index_signup = function(req, res) {
    res.render('signup');
}