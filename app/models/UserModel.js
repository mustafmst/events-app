var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  login: String,
  password: String,
  name: String,
  surname: String
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null);
};

userSchema.methods.isPasswordValid = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
