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
  console.log('user:', user.firstName, '- region:', region)
  userListing = user.createListing(name, country, region, place, numOfRooms, numOfBedsInTotal)
  console.log(user.listings)
  res.sendStatus(200)
})
router.get('/dynamic/:userId', (req, res) => res.send(user.listings))

module.exports = router
