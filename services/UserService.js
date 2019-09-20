const UserModel = require('../models/User');

class UserService {
    static async findAllUser() {
        return UserModel.find({}).exec()
            .then(users => {
                return users;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
    static async findUser(userId) {
        return UserModel.findOne({ userId }).exec()
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
    static async create(user) {
        if (!user) {
            throw { errors: [{ msg: '¡No hay usuario válido!' }] };
        }
        return user.save();
    }

    static async userValidation(user, passwd) {
        if (!user || !passwd) {
            throw { errors: [{ msg: '¡Faltan parámetros!' }] };
        }
        return user.comparePassword(passwd);
    }
    static async userEdit(user) {
        try {
            let newpassword;
            let isEqual = await user.comparePassword(user.password);
            if (!isEqual) {
                newpassword = await user.encryptPassword(user.password);
            }
            const promise = UserModel.findOneAndUpdate({ userId: user.userId }, {
                $set: {
                    name: user.name,
                    surname: user.surname,
                    password: !isEqual ? newpassword : user.password,
                    role: user.role
                }
            }).exec();
            return promise;
        } catch (err) {
            return err;
        }
    }

    static async userDelete(id) {
        return UserModel.deleteOne({ userId: id }).exec();
    }
}

module.exports = UserService;