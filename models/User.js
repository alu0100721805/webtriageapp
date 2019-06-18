let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    idmedico: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /([0-4][0-9]|[5][0-2])\d{7}/.test(v);
            }
        }
    },
    constraseña: {
        type: String,
        require: true
    },
    firma: {
        type: String,
    },
    respuesta: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        enum: ['administrador', 'usuario'],
        default: 'usuario'
    }
});

module.exports = mongoose.model('User', userSchema);
