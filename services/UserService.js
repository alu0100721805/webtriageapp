
const UserModel = require('../models/User');

class UserService {

    static async create(user) {
      if(!user){
        return undefined;
      }
      return UserModel.findOne({userId:user.userId}).exec()
      .then( userFounded => {
          if(userFounded){
            throw {errors:[{msg:'¡El número de colegiado ya está en uso!'}]};    
          }
          return user.save();
      }).catch(err => {
        throw err;
      });
    }
    static async userValidation(id, passwd){
     
      return UserModel.findOne({userId: id}).exec().then(userFounded => {
          if(!userFounded){
            throw new Error(`No se ha encontrado el médico: ${ id }`);
          }
          return userFounded.comparePassword(passwd);
         }).catch(err => {
            throw err;
         });
    }
   
}

module.exports = UserService;