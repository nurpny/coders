const mongoose = require('mongoose')

const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// register models
require('./models')

mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/' + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log("mongodb database connection successful")
})


module.exports = mongoose
