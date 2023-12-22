const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Listing = require('../models/listing')
const Offer = require('../models/offer')

let user
let userListing
const listingList = ['Blue Hills']
const offerList = ['Special Summer Sale']
router.get('/', (req, res) => {
  res.send(user)
})
router.post('/', (req, res) => {
  const { firstName, lastName } = req.body
  user = new User(firstName, lastName)
  res.send(user)
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
  userListing = user.createListing(name, country, region, place, numOfRooms, numOfBedsInTotal)
  res.sendStatus(200)
})
router.get('/dynamic/:userId', (req, res) => res.send(user.listings))
router.post('/newOffer/:userId', (req, res) => {
  const { listing, offerName, startString, checkIn, endString, checkOut, price, currency } = req.body
  user.createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency)
  res.sendStatus(200)
})
router.get('/newOffer/:userId', (req, res) => res.send(user.offers))
router.get('/:userId/offerList', (req, res) => {
  // new user does not need to be created again, as he was created by former post request from client
  if (user.firstName === req.params.userId) console.log(user)
  res.send(user.listings)
})
router.put('/:userId/updateOffer', (req, res) => {
  const { offer, auction, startDate, startTime, endTime } = req.body
  if (user.firstName === req.params.userId) user.updateOfferAddAuction(offer, auction, startDate, startTime, endTime)
})
module.exports = router
