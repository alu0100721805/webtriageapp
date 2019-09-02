var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
      type: String,
      required: true 
    },
    surname :{
      type: String,
      required: true 
    },
    password: {
        type: String,
        required: true,
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

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10,function(err,salt){
      if( err){
        return next(err);
      }
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

var User = mongoose.model('User', UserSchema);
module.exports = User;



