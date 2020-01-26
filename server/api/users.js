const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
