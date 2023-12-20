const Listing = require('./listing')
const Offer = require('./offer')
// const Auction = require('./auction')

class User {
  constructor(firstName, lastName) {
    this.first = firstName || ''
    this.last = lastName
    this.listings = []
    this.offers = []
    this.auctions = []
  }

  createListing(name, location) {
    const listing = new Listing(this.last, name, location)
    this.listings.push(listing)
  }

  createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency, toAuction) {
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
      const offer = Offer.create({ initiator, listing, offerName, start, end, price, currency, toAuction })
      this.offers.push(offer)
    } else console.log('Please add your listing first, then enter the offer period')
  }

  updateOfferForAuction(offer, auction) {
    // offer names will be replaced by ids later, so no need for further checks at this point
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.addAuctionProp(auction)
  }

  updateOfferRemoveAuction(offer) {
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.removeAuctionProp()
  }
  /*
    lookupListingsInAuction(auction) {
      console.log(this.auctions.filter(el => el.auctionName === auction))
      return this.auctions.filter(el => el.auctionName === auction)
    } */

  addEmail(email, password) {
    this.email = email
    this.password = password
  }
}
module.exports = User
