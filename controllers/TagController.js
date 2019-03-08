var Tag = require("../models/Tag");

exports.tag_create_post = function (req, res){
  var objTag = new Tag(req.body);
  objTag.save(
    function (err) {  
              if (err) {
                   if (err.name === 'MongoError' && err.code === 11000)
                      return res.status(202).send(JSON.stringify({ succes: false, message: 'La etiqueta ya existe!' }));
                  return res.send(err);
               }
               res.status(201).send({message:'Se ha creado la etiqueta'});
    });
}
exports.tag_findById_post = function (req, res){
  var id = req.body.id;
  if(req.body.id){
      Tag.findOne({'id': id}, function(err, obj) {
              if(err){
                res.status(204).send({"message":"Ha ocurrido un error en la búsqueda"});
              } else{
                console.log(JSON.stringify(obj));
                res.status(200).send({"tag" : obj});
              }
      });
    }else res.status(500).send({"message":"Error interno en el servidor, no se ha especificado el id"});
   
   
}
exports.tag_findById_get = function(req,res,next){
    var id = req.query.id;
    if(req.query.id){
      Tag.findOne({'id': id} , function(err, obj) {
              if(err){
                res.status(500).send(err);
              } else{
                res.status(200).send(obj);
              }
      });
    }else next();
    
}
exports.tag_findByColor_get = function(req,res,next){
    var color = req.query.color;
    if(color){
      Tag.find({"color":color}, function(err, objs) {
              if(err){
                res.status(500).send(err);
              } else{
                  res.status(200).send(objs);
              }
      });
    }else next();
    
}

exports.tag_index_get = function(req,res){
  res.render("MapManagement");
}





  

