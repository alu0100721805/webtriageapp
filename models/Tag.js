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
  created: 
        {type: Date,
        default: Date.now }
});

var Tag = mongoose.model('Tag', tagschema);
module.exports = Tag;