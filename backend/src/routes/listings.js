const express = require('express')

const router = express.Router()
const Listing = require('../models/listing')

// create a new listing
router.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    console.log('error requesting route', error)
  }
})

// get all listings
router.get('/', async (req, res) => {
  res.send(await Listing.find())
})

module.exports = router
