const express = require('express')
const passport = require('passport')

const router = express.Router()
const AuthUser = require('../models/authUser')

router.post('/newUser', async (req, res) => {
  const { email, nickName, password } = req.body
  AuthUser.register({ email, nickName }, password, (err, user) => {
    if (err) {
      console.log('Error on user auth creation', err)
    }
    res.send(user)
  })
})
router.post('/session', passport.authenticate('local', { failWithError: true }), (req, res) => {
  console.log('User is authenticated', req.session)
  res.send(req.user)
})
router.get('/session', async (req, res) => {
  console.log('User get req', req.session)
  res.send(req.user)
})
module.exports = router
