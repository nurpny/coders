const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password")
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (! await user.comparePassword(req.body.password, user.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    })
    const user = await newUser.save()
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    console.log(err)
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log("req.user>>>", req.user)
  res.json(req.user)
})

router.use('/google', require('./google'))
