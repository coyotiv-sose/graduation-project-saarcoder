const express = require('express')
const User = require('../models/user')
const Listing = require('../models/listing')
const Offer = require('../models/offer')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Early Bird' })
})
// adding a top level delete route to clear out all users, listings, and offers before adding new ones from the client on test.js
router.get('/db', async (req, res) => {
  await User.deleteMany()
  await Listing.deleteMany()
  await Offer.deleteMany()
  res.send('deleted')
})
module.exports = router
