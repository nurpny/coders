'use strict'

const db = require('../server/db/mongoose')
const { User } = require('../server/db/models')
const mongoose = require('mongoose');


async function seed() {

  try {
    await User.remove({}, function (err) {
      console.log('Users removed')
    });

    let newUser1 = new User({
      email: 'thanos@gmail.com',
      password: 'Password123'
    })

    let newUser2 = new User({
      email: 'groot@gmail.com',
      password: 'Password234'
    })

    await newUser1.save(function (err) {
      console.log("Thanos created")
    })
    await newUser2.save(function (err) {
      console.log("Groot created")
    })
  } catch (err) {
    console.error(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    // await mongoose.connection.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
