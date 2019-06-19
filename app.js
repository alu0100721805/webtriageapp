const express = require('express'),
    errorHandler = require('errorhandler');
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    expressSession = require('express-session'),
    config = require('./config/config'),
    app = express();

mongoose.promise = global.Promise;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ 'strict': true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(expressSession(
  { secret: 'webtriagestart',
    resave: true,
    saveUninitialized: true
  }
));
app.use(passport.initialize());
app.use(passport.session());


let routes = require('./router/UserRouter')(passport);

//is Production ?
const isProduction = process.env.NODE_ENV === 'production';

if(!isProduction) {
    app.use(errorHandler());
  }
  
const connectionString = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
const  options = {
        useMongoClient : true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE, 
        reconnectInterval: 2000, 
        poolSize: 10, 
        bufferMaxEntries: 0
};

 // Utilidades
 let gracefulExit = function() {
  mongoose.connection.close(function() {
      console.log('Se cierra la conexión de la base de datos dado que se ha terminado el proceso');
      process.exit(0);
  });
}

// EVENTS 

// Si se mata el proceso se cierra la base de datos
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
//Eventos de conexión a la base de datos
mongoose.connection.on('connected', function() {
    app.use('/', routes);
    console.log('Conectado a ' + connectionString);
        app.listen(config.app.port, config.app.ip, function(err) {
          if (err) throw err;
          console.log("Servidor escuchando en el puerto:" + config.app.port + " en la dirección:" + config.app.ip);
})});
mongoose.connection.on('error', function(err) {
    console.log('Error de conexión: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('¡Se ha desconectado de la base de datos!');
}, gracefulExit);

 // Conectar con Moongose
 mongoose.connect(connectionString, options);


//Manejadores de errores y midlewares
if(!isProduction) {
    app.use((err, req, res) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });


module.exports = app;