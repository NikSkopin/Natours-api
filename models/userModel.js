const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please cofirm the password.'],
    validate: {
      //This only works on save.
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
