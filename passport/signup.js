
var LocalStrategy  = require('passport-local').Strategy;

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
        },
        function(req, idmedico, contraseña, done) {

            findOrCreateUser = function(){
            
                User.findOne({ 'idmedico' :  idmedico }, function(err, user) {
                   
                    if (err){
                        console.log('Error en registrar el médico '+err);
                        return done(err);
                    }
                    
                    if (user) {
                        console.log('El médico ya existe : '+idmedico);
                        return done(null, false,{message:'El médico ya existe : '+idmedico});

                    } else {
                    r
                        var medic = new User();
                        medic.idmedico = idmedico;
                        medic.contraseña = createHash(contraseña);
                        medic.firma = req.body('firma');
                        medic.respuesta = req.body('respuesta');
                        medic.rol = req.body('rol');

                        // save the user
                        medic.save(function(err) {
                            if (err){
                                console.log('Error al guardar el médico: '+err);  
                                throw err;  
                            }
                            console.log('Nuevo médico creado');    
                            return done(null, medic,{message:' Colegiado Registrado !'});

                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

}