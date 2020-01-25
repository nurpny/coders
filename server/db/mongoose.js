const mongoose = require('mongoose')

const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// if (process.env.NODE_ENV === 'test') {
//   after('close database connection', () => db.close())
// }

const db = mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/' + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true
}, function (err) { if (err) throw err; console.log("Connected to MongoDB") })


module.exports = db
