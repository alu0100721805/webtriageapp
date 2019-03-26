var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(idmedico, constraseña, done) { 
            User.findOne({ 'idmedico' :  idmedico }, 
                function(err, user) {
                    if (err)
                        return done(err);
                    if (!user){
                        console.log('Colegiado no encontrado con numero:  '+ idmedico);
                        return done(null, false,{ message: 'Colegiado no encontrado con numero:  '+ idmedico });                 
                    }
                    if (!isValidPassword(user, constraseña,)){
                        console.log('Contraseña inválida',{message: 'Contraseña inválida'});
                        return done(null, false); 
                    }  
                    return done(null, user,{message: ' Acceso autorizado'});
                }
            );

        })
    );
    var isValidPassword = function(user, constraseña){
        return bCrypt.compareSync(constraseña, user.constraseña);
    }
    
}