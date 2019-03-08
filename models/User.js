var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    idmedico: {
        type:String,
        require:true,
        unique:true},
    password: {
        type:String,
        require:true
    },
    pregunta: {
        type:String,
        require:true},
    rol: {
        type:String,
        enum:['administrador','usuario'], default:'user'},
        password:{type:String,required:true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;


