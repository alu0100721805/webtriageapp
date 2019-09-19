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
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    registrationDate: {
        type: Date,
        default: Date.now
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
        next();
      });
    });
});
UserSchema.methods.encryptPassword =  function(password) {
  return new Promise((resolve, error) => {
    bcrypt.genSalt(10,function(err,salt){
      if( err){
       error(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          error(err);
        }
        resolve(hash);
      });
    });
  });
};

UserSchema.methods.comparePassword =  function(candidatePassword) {
  return new Promise((resolve, error) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) =>{
      if (err) { error(err);}
      resolve(success);
    });
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;



