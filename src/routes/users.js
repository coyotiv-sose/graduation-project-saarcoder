const express = require('express')

const router = express.Router()

const User = require('../models/user')

let user

const listingList = ['Blue Hills']

const offerList = ['Special Summer Sale']

/* GET users listing. */
router.get('/', async (req, res) => {
  res.send(await User.find())
})

router.post('/', async (req, res) => {
  res.send(await User.create({ firstName: req.body.firstName, lastName: req.body.lastName }))
})

router.get('/staticOffers', (req, res) => {
  res.send(offerList)
})

router.get('/staticListings', (req, res) => {
  res.send(listingList)
})

router.get('/staticListing', (req, res) => {
  res.send(listingList[0])
})

// create a new listing in users list
router.post('/dynamic/:userId', (req, res) => {
  const { name, country, region, place, numOfRooms, numOfBedsInTotal } = req.body
  user.createListing(name, country, region, place, numOfRooms, numOfBedsInTotal)
  res.sendStatus(200)
})

router.get('/dynamic/:userId', (req, res) => res.send(user.listings))

router.post('/newOffer/:userId', (req, res) => {
  const { listing, offerName, startString, checkIn, endString, checkOut, price, currency } = req.body
  user.createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency)
  res.sendStatus(200)
})

router.get('/newOffer/:userId', (req, res) => res.send(user.offers))

router.get('/:userId/listings', (req, res) => {
  // new user does not need to be created again, as he was created by former post request from client
  if (user.firstName === req.params.userId) res.send(user.listings)
})

router.put('/:userId/updateAddAuctionToOffer', (req, res) => {
  const { offer, auction, startDate, startTime, endTime } = req.body
  if (user.firstName === req.params.userId) {
    user.updateOfferAddAuction(offer, auction, startDate, startTime, endTime)
  }
  res.sendStatus(200)
})

router.get('/:userId/offers', (req, res) => {
  if (user.firstName === req.params.userId) res.send(user.offers)
})

router.delete('/:userId/deleteOffer/:resource', (req, res) => {
  const offer = req.params.resource
  if (user.firstName === req.params.userId) {
    user.deleteOffer(offer)
    res.sendStatus(200)
  }
})

router.get('/:userId/search/:offerForAuction', (req, res) => {
  const { userId, offerForAuction } = req.params
  if (user.firstName === userId) res.send(user.readListingsInAuction(offerForAuction))
})

module.exports = router
