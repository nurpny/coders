/* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody

//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')

const mongoose = require('mongoose');
const User = require('./user');

const connStr = 'mongodb://127.0.0.1:27017/coders'
mongoose.connect(connStr, function (err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
  email: 'jmar777@gmail.com',
  password: 'Password123'
});

// save user to database
let testing = async () => {
  // await testUser.save()
  try {
    let user = await User.findOne({ email: 'jmar777@gmail.com' })
    console.log("user>>>", user);
    let response1 = await user.comparePassword('Password123');
    console.log("Password123>>>", response1)
    let response2 = await user.comparePassword('Password234');
    console.log("Password>>>", response2)
  } catch(err) {
    console.err(err)
  }

}

testing();

// testUser.save(function (err) {
//   if (err) throw err;
//   // fetch user and test password verification
//   User.findOne({ email: 'jmar777@gmail.com' }, function (err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function (err, isMatch) {
//       if (err) throw err;
//       console.log('Password123:', isMatch); // -> Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function (err, isMatch) {
//       if (err) throw err;
//       console.log('123Password:', isMatch); // -> 123Password: false
//     });
//   });
// })
