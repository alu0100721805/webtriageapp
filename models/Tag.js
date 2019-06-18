var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagschema = new Schema({
  id:  
       {type: String, 
        unique: true,
        required: true},
  color: 
       {type: String,
        required:true},
  latitud: 
        {type: Number,
        required: true},
  longitud: 
        {type: Number,
        required: true},
  idmedico: 
        {type: String,
        default: ""},
  fechaalta: 
        {type: Date,
        default: Date.now }
});

module.exports  = mongoose.model('Tag', tagschema);