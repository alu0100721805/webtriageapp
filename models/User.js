var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    idmedico: {
        type:String,
        require:true,
        unique:true,
        validate: {
            validator: function(v) {
            return /[0-5][0-9]\d{7}/.test(v);}
        }
    },
    constraseña: {
        type:String,
        require:true
    },
    firma: {
        type:String,
    },
    pregunta: {
        type:String,
        require:true
    },
    rol: {
        type:String,
        enum:['administrador','usuario'], 
        default:'usuario'
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;


