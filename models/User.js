var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /([0-4][0-9]|[5][0-2])\d{7}/.test(v);
            }
        }
    },
    password: {
        type: String,
        require: true
    },
    sign: {
        type: String,
    },
    answer: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});
var User  = module.exports = mongoose.model('User', userSchema);
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password, salt , function(err, hash){
            newUser.password = hash;
            // IBE SIGN -> TODO:
            newUser.save(callback);
        });
    });
};