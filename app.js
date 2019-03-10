var express = require('express'),
    config = require('./config'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    tagrouter = require('./router/TagRouter'),
    userrouter = require('./router/UserRouter'),
    app = express(),
    router = express.Router();
app.set('views', './views')
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/tag', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));

const connectionString = "mongodb://"+config.db.host+":"+ config.db.port+"/"+config.db.name;

var gracefulExit = function() {
    mongoose.connection.close(function() {
        console.log('Se cierra la conexión de la base de datos dado que se ha terminado el proceso');
        process.exit(0);
    });
}

mongoose.connection.on('error', function(err) {
    console.log('Error de conexión: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('¡Se ha desconectado de la base de datos!');

}, gracefulExit);

// Si se mata el proceso de node entonces se desconecta de la base de datos
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
mongoose.connect(connectionString, { useMongoClient: true }, function(err, db) {

    if (err) {
        console.log('Lo sentimos, no se esta ejecutando el servidor de mongodb .');
    } else {
        //Una vez conectado al servidor , se proceden a registrar las rutas con los controladores oportunes

        app.use("/", router);
        app.use("/tag", tagrouter);
        app.use("/user", userrouter);
        app.use("/MapManagement", function(req, res, next) {
            res.redirect("/tag/");
        })
        app.use("/login", function(req, res, next) {
            res.redirect("/user/login");
        })
        app.listen(config.app.port, config.app.ip, function(err) {
            if (err) throw err;
            console.log("Servidor escuchando en el puerto:" + config.app.port + " en la dirección:" + config.app.ip);
        });
    }
});


//Eventos de conexión a la base de datos
mongoose.connection.on('connected', function() {
    console.log('Conectado a ' + connectionString);
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;