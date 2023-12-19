const express = require('express')
const User = require('../models/user')

const router = express.Router()

// start from copy pasting...
// create a picnic for a user
/* router.post('/:userId/offers', function (req, res) {
  const user = User.list.find(user => user.name === req.params.userId)

  const picnic = user.createPicnic({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
  })

  res.send({ name: picnic.name, location: picnic.location, date: picnic.date })
}) */
module.exports = router
