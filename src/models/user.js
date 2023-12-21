const Listing = require('./listing')
const Offer = require('./offer')

class User {
  constructor(firstName, lastName) {
    this.first = firstName || ''
    this.last = lastName
    this.listings = []
    this.offers = []
  }

  createListing(name, location) {
    const listing = new Listing(this.last, name, location)
    this.listings.push(listing)
  }

  updateListingName(name, newName) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].name = newName
    const offerIndices = this.offers.f
  }

  updateListingOwner(name, newOwner) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].owner = newOwner
    // TODO: update related offers
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
      const initiator = this.last
      let [startDay, startMonth, startYear] = startString.split('.')
      let [endDay, endMonth, endYear] = endString.split('.')
      if (startYear.length === 2 || endYear.length === 2) {
        startYear = startYear.padStart(4, '20')
        endYear = endYear.padStart(4, '20')
      }
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
    if (startYear.length === 2) {
      startYear = startYear.padStart(4, '20')
    }
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
    console.log(end)
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.addAuctionProps(auction, start, end)
  }

  updateOfferRemoveAuction(offer) {
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.removeAuctionProps()
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
module.exports = User
