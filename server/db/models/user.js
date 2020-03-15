// const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// const db = require('../db')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    select: false
  },
  salt: {
    type: String,
  },
  googleId: {
    type: String,
  },
  languages: {
    type: Array,
  },
  interests: {
    type: Array,
  },
  pic: {
    type: String,
    default: 'https://i.insider.com/5ae75d4ebd967122008b4623'
  }
})


/**
 * Password Save
 */

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = async function (candidatePassword, userPW) {
  try {
    const result = await bcrypt.compare(candidatePassword, userPW)
    return result;
  } catch (err) {
    console.error(err)
  }
};


module.exports = mongoose.model("User", UserSchema);
