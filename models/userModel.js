const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email.',
    },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'A password must be longer then 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please cofirm the password.'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;