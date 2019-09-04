
const UserModel = require('../models/User');

class UserService {

    static async findUser(userId) {
      return UserModel.findOne({userId}).exec()
      .then(user => {
        return user;
      })
      .catch(err => {
        throw new Error(err);
      });
    }
    static async create(user) {
      if(!user){
         throw {errors:[{msg:'¡No hay usuario válido!'}]};    
      }
      return user.save();
    }

    static async userValidation(user, passwd){
      if(!user || !passwd) {
        throw {errors:[{msg:'¡Faltan parámetros!'}]};    
      }
      return user.comparePassword(passwd);
    }
   
}

module.exports = UserService;