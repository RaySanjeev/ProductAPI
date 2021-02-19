const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide your uesr name'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provide user email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide user password'],
    select: false,
    minlenght: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'PLease confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Entered passwords are not the same',
    },
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'Role can either be admin or user',
    },
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
