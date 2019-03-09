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
    password: {
        type:String,
        require:true
    },
    signkey: {
        type:String,
    },
    answer: {
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


