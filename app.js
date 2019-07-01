const express = require('express'),
    errorHandler = require('errorhandler');
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);
    config = require('./config/config'),
    app = express();

mongoose.promise = global.Promise;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ 'strict': true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(session(
  { secret: 'webtriagestart',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }
));
app.use(passport.initialize());
app.use(passport.session());


let router = require('./router/routes');


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
  app.use('/', router);
  app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

    console.log('Conectado a ' + connectionString);
        app.listen(config.app.port, config.app.ip, function(err) {
          if (err) throw err;
          console.log("Server listen On:", config.app.ip + config.app.port );
})});
mongoose.connection.on('error', function(err) {
    console.log('Error de conexión: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('¡Se ha desconectado de la base de datos!');
}, gracefulExit);

 // Conectar con Moongose
 mongoose.connect(connectionString, options);



module.exports = app;