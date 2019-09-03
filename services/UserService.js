const UserModel = require('../models/User');



class UserService {

    static create(body) {
      const  newUser = new UserModel({
              userId: body.userId,
              name: body.name,
              surname: body.surname,
              password: body.password,
              answer: body.answer,
              role: body.role
      });
      return UserModel.findOne({userId:body.userId})
      .then(user => {
          if(user){
            throw {errors:[{msg:'¡El número de colegiado ya está en uso!'}]};    
          }else {
            return newUser().save();
          }
      })
    }
    static  userValidation(userId, password){
        
    }
   
}

module.exports = UserService;