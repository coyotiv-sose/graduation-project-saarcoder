const express = require('express')

const router = express.Router()

const User = require('../models/user')

/* GET users listing, updated to work with MongoDB */
router.get('/', async (req, res) => {
  // instead of working with a local user variable (updated by the post request), now we work with the first user in the database
  res.send(await User.findOne())
})

router.post('/', async (req, res) => {
  res.send(await User.create({ firstName: req.body.firstName, lastName: req.body.lastName }))
})

// create a new listing in users list
router.post('/dynamic/:userId', async (req, res) => {
  const { name, country, region, place, numOfRooms, numOfBedsInTotal } = req.body
  const user = await User.findById(req.params.userId)
  console.log('request', req.body, 'uid from params:', req.params.userId)
  console.log('user:', user)

  const listing = await user.createListing(name, country, region, place, numOfRooms, numOfBedsInTotal)

  res.send(listing)
})

router.get('/dynamic/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user.listings)
})

router.post('/newOffer/:userId', async (req, res) => {
  const { listing, offerName, startString, checkIn, endString, checkOut, price, currency } = req.body
  const user = await User.findById(req.params.userId)
  const offer = await user.createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency)
  res.send(offer)
})

router.get('/newOffer/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user.offers)
})

router.get('/:userId/listings', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user.listings)
})

router.put('/:userId/updateAddAuctionToOffer', async (req, res) => {
  const { offer, auction, startDate, startTime, endTime } = req.body
  const user = await User.findById(req.params.userId)
  const offerSetForAuction = await user.updateOfferAddAuction(offer, auction, startDate, startTime, endTime)
  res.send(offerSetForAuction)
})

router.get('/:userId/offers', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user.offers)
})

router.delete('/:userId/deleteOffer/:resource', async (req, res) => {
  const offer = req.params.resource
  if ((await User.firstName) === req.params.userId) {
    await User.deleteOffer(offer)
    res.sendStatus(200)
  }
})

router.get('/:userId/search/:offerForAuction', async (req, res) => {
  const { userId, offerForAuction } = req.params
  if ((await User.firstName) === userId) res.send(await User.readListingsInAuction(offerForAuction))
})

module.exports = router
