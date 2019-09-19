const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    config = require('./config/config'),
    routerLogin = require('./router/LoginRouter'),
    routerSignup = require('./router/SignupRouter'),
    routerMap = require('./router/TriageManagementRouter'),
    routerUsers = require('./router/UserRouter'),
    app = express();


app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ 'strict': true }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));



let connectionString = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;

if (config.uri != '') {
    connectionString = config.uri;
}
const options = {
    useMongoClient: true,
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
app.set('port', process.env.PORT || 3000);
app.use('/', routerLogin);
app.use('/signup', routerSignup);
app.use('/triageManagement', routerMap);
app.use('/users', routerUsers);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

mongoose.connection.on('connected', async function() {
    console.log('Connecting to ' + connectionString);
});

mongoose.connection.on('error', function(err) {
    console.log('Database connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('The database has been disconnected');
}, gracefulExit);

mongoose.Promise = global.Promise,
    //mongoose.connect(connectionString, options);
    mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.createConnection(connectionString, { useNewUrlParser: true });
app.listen(app.get('port'), () => {
    console.log(`Server listen on PORT : ${app.get('port')}`);
});
module.exports = app;