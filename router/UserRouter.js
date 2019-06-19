var express = require('express');
var router = express.Router();
var user_controller_ = require('../controllers/UserController');
var tagrouter = require('../router/TagRouter');
var isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
};

module.exports = function(passport){

    router.get('/login',user_controller_.index_login);
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
    }));

    router.get('/signup', user_controller_.index_signup);
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : false 
	}));
	router.use('/map', isAuthenticated, tagrouter);
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
