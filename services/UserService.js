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
    return newUser.save();
  }
}

module.exports = UserService;