var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    tagrouter = require('./router/TagRouter'),
    userrouter = require('./router/UserRouter'),
    app = express();

app.set('views', './views')
app.set('view engine', 'pug');
app.use(bodyParser.json({ 'strict': true }));
app.use('/static', express.static(__dirname + '/public'));

const connectionString = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
const  options = {
        useMongoClient : true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE, 
        reconnectInterval: 2000, 
        poolSize: 10, 
        bufferMaxEntries: 0
};
var gracefulExit = function() {
    mongoose.connection.close(function() {
        console.log('Se cierra la conexión de la base de datos dado que se ha terminado el proceso');
        process.exit(0);
    });
}

// Si se mata el proceso de node entonces se desconecta de la base de datos
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

//Eventos de conexión a la base de datos
mongoose.connection.on('connected', function() {
    console.log('Conectado a ' + connectionString);
        app.use("/map", tagrouter);
        app.use("/login", userrouter);
        app.use("/signup", userrouter);
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

 mongoose.connect(connectionString, options);



module.exports = app;