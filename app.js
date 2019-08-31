const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session'),
    config = require('./config/config'),
    routerLogin = require('./router/loginRouter'),
    routerSignup = require('./router/signupRouter'),
    routerMap = require('./router/mapRouter'), 
    app = express();
const  MongoStore = require('connect-mongo')(session);

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ 'strict': true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(session(
  { secret: 'secure webtriage',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }
));
app.use(passport.initialize());
app.use(passport.session());

  
const connectionString = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
const  options = {
        useMongoClient : true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE, 
        reconnectInterval: 2000, 
        poolSize: 10, 
        bufferMaxEntries: 0
};

 let gracefulExit = function() {
  mongoose.connection.close(function() {
      console.log('The database process has closed unexpectedly');
      process.exit(0);
  });
}

app.use('/signup',routerSignup);
app.use('/login', routerLogin);
app.use('/home',routerMap);

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

mongoose.connection.on('connected', async function() {
    console.log('Connecting to ' + connectionString);
    app.listen(config.app.port, config.app.ip, function(err) {
    if (err) throw err;
    console.log("Server listen On:", config.app.ip + config.app.port );
})});

mongoose.connection.on('error', function(err) {
    console.log('Database connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('The database has been disconnected');
}, gracefulExit);

 mongoose.Promise = global.Promise,
 mongoose.connect(connectionString, options);

module.exports = app;