const mongoose = require('mongoose')
const Listing = require('./listing')
const Offer = require('./offer')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  offer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
})

module.exports = mongoose.model('User', userSchema)

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName || ''
    this.lastName = lastName
    this.listings = []
    this.offers = []
  }

  createListing(name, country, region, place, numOfRooms, numOfBedsInTotal) {
    const listing = new Listing(this.lastName, name, country, region, place, numOfRooms, numOfBedsInTotal)
    this.listings.push(listing)
  }

  updateListingName(name, newName) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].name = newName
    // TODO: update related offers
  }

  updateListingOwner(name, newOwner) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].owner = newOwner
    // TODO: update related offers
  }

  updateRemainingListingProps(
    listingName,
    numOfDoubleBeds,
    cribOrCotAvailable,
    kitchen,
    kettle,
    fridge,
    freezer,
    stove,
    oven,
    highChairAvailable,
    washingMachine,
    linen,
    underfloorHeating,
    laminateFlooring,
    warmWaterAvailable
  ) {
    const listingIndex = this.listings.findIndex(el => el.name === listingName)
    this.listings[listingIndex].addRemainingProps({
      numOfDoubleBeds,
      cribOrCotAvailable,
      kitchen,
      kettle,
      fridge,
      freezer,
      stove,
      oven,
      highChairAvailable,
      washingMachine,
      linen,
      underfloorHeating,
      laminateFlooring,
      warmWaterAvailable,
    })
  }

  deleteListing(listing) {
    this.listings.splice(
      this.listings.findIndex(el => el.name === listing),
      1
    )
  }

  getListingNames() {
    const listingNames = []
    // just show the names, not objects:
    this.listings.forEach(el => listingNames.push(el.name))
    return listingNames
  }

  createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency) {
    const names = this.listings.map(el => el.name)
    if (names.includes(listing)) {
      const initiator = this.lastName
      let [startDay, startMonth, startYear] = startString.split('.')
      let [endDay, endMonth, endYear] = endString.split('.')
      // adding the century if forgotten by the user
      startYear = startYear.padStart(4, '20')
      endYear = endYear.padStart(4, '20')
      const start = new Date(startYear, (startMonth -= 1), startDay, checkIn)
      const end = new Date(endYear, (endMonth -= 1), endDay, checkOut)
      const offer = Offer.create({ initiator, listing, offerName, start, end, price, currency })
      this.offers.push(offer)
    } else throw new Error('Please add your listing first, then enter the offer period')
  }

  deleteOffer(offer) {
    const elIndex = this.offers.findIndex(el => el.offerName === offer)
    this.offers.splice(elIndex, 1)
  }

  updateOfferAddAuction(offer, auction, startDate, startTime, endTime) {
    if (typeof startDate === 'undefined') throw new Error('Please enter a date for when you want to start the auction')
    let [startDay, startMonth, startYear] = startDate.split('.')
    startYear = startYear.padStart(4, '20')
    const start = new Date(startYear, (startMonth -= 1), startDay, startTime)
    // handle timeStrings that give minutes after colon
    let end
    if (endTime.length === 5 && endTime.includes(':')) {
      const hour = endTime.split(':')[0]
      const min = endTime.split(':')[1]
      end = new Date(startYear, startMonth, startDay, hour, min)
    } else {
      end = new Date(startYear, startMonth, startDay, endTime)
    }
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.addAuctionProps(auction, start, end)
  }

  updateOfferRemoveAuction(offer) {
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.removeAuctionProps()
  }

  updateOfferChangePrice(offerName, price) {
    const selected = this.offers.filter(el => el.offerName === offerName)[0]
    selected.minPrice = price
  }

  readListingsInAuction(auction) {
    const searchList = this.offers.filter(el => el.auction === auction)
    // restrict display to offer names:
    return searchList.map(el => el.offerName)
  }

  addEmail(email, password) {
    this.email = email
    this.password = password
  }
}

// module.exports = User
