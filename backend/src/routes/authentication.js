const express = require('express')

const router = express.Router()
const AuthUser = require('../models/authUser')

router.post('/newUser', async (req, res) => {
  const newUser = new AuthUser({ username: req.body.email, nickName: req.body.nickName })
  await newUser.setPassword(req.body.password)
  await newUser.save()

  res.send(newUser)
})

module.exports = router
