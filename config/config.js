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
        TOKEN_SECRET: "BZwvzn9M8G9TAyS6CpRf5JAIgTclezg5",
        TOKEN_EXP: 300
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'triagestartdb'
    },
    uri: 'mongodb+srv://alu0100721805:<password>@triagestartdb-qbdtk.gcp.mongodb.net/test?retryWrites=true&w=majority'

};

const prod = {
    self: this,
    app: {
        ip: process.env.IP,
        port: 8080,
        TOKEN_SECRET: "dBKzg3yZDq4nyQyjBeqGbaBYjqdq7P8o"
    },
    db: {
        host: process.env.IP,
        port: 27017,
        name: 'triagestartdb'
    },
    uri: ''
};

if (env == "production") {
    config = prod;
} else {
    config = dev;
}

module.exports = config;