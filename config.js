// config.js
env = process.env.NODE_ENV; // 'dev' or 'prod'
if (env === undefined) {
    env = "prod";
}
console.log("Entorno :=" + env);
const dev = {
    app: {
        ip: "localhost",
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'triagestartdb'
    }
};

const prod = {
    app: {
        ip: process.env.IP,
        port: process.env.PORT
    },
    db: {
        host: process.env.IP,
        port: 27017,
        name: 'triagestartdb'
    }
};
var config;
if (env == "prod") {
    config = prod;
} else {
    config = dev;
}
module.exports = config;