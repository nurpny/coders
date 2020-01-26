const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log("LINE 7")
    debugger;
    User.find().then(function(users){
      console.log(users);
      res.json(users)
    })
    // const users = await User.find();
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!

  } catch (err) {
    next(err)
  }
})
