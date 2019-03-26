
var login = require('./login');
var signup = require('./signup');
var User = require('../models/User');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('Serializar Colegiado : ');console.log(user);
        done(null, user.idmedico);
    });

    passport.deserializeUser(function(idmedico, done) {
        User.findById(idmedico, function(err, user) {
            console.log('Deserializar Colegiado:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}