const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Listing = require('../models/listing')
const Offer = require('../models/offer')

/* GET listing */
router.get('/:id', async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  res.json(listing)
})
module.exports = router
