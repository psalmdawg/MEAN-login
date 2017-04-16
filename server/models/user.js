const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
  email: {
    type:String,
    required:true,
    unique:true
  },
  username: {
    type:String,
    required:true,
    unique:true
  },
  firstName: {
    type:String

    // required:true
  },
  lastName: {
    type:String
    // required:true
  },
  password: {
    type:String,
    required:true
  }

});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema)
