// config.js
env = process.env.NODE_ENV; // 'dev' or 'prod'
let config;
if (env === undefined) {
    env = "prod";
}
console.log("Entorno :=" + env);

const dev = {
    self: this,
    app: {
        ip: "localhost",
        port: 3000,
        secret: "esunsecreto"
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'triagestartdb'
    }

};

const prod = {
    self: this,
    app: {
        ip: process.env.IP,
        port: 8080,
        secret: "esunsecreto"
    },
    db: {
        host: process.env.IP,
        port: 27017,
        name: 'triagestartdb'
    }
};

if (env == "production") {
    config = prod;
} else {
    config = dev;
}
module.exports = config;