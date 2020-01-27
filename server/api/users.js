const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.get('/:languageTag', async (req, res, next) => {
  try {
    const languageTag = req.params.languageTag
    let users = await User.find(
      {languages: languageTag}
    )
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
