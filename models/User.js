var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
        /*validate: {
            validator: function(v) {
                return /([0-4][0-9]|[5][0-2])\d{7}/.test(v);
            }
        }*/
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v);
            }
        }
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;

//authenticate input against database
UserSchema.statics.authenticate = function (userId, password, callback) {
    User.findOne({ userId: userId })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      console.log(user);
      next();
    });
    });
});




