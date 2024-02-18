const express = require('express')

const router = express.Router()
const Listing = require('../models/listing')

// create a new listing
router.post('/', async (req, res) => {
  const { name, country, region, place, type, numOfRooms, numOfBedsInTotal, ownerId } = req.body

  const listing = await Listing.create({
    owner: ownerId,
    name,
    country,
    region,
    place,
    type,
    numOfRooms,
    numOfBedsInTotal,
  })

  res.send(listing)
})

module.exports = router
