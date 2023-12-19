const Listing = require('./listing')
const Offer = require('./offer')
const Auction = require('./auction')

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

  createOffer(listing, startString, checkIn, endString, checkOut, price) {
    // TODO: Check if the current user has permission to create an offer (isOwner = true)
    const names = this.listings.map(el => el.name)
    if (names.includes(listing)) {
      const initiator = this.last
      let [startDay, startMonth, startYear] = startString.split('.')
      let [endDay, endMonth, endYear] = endString.split('.')
      const start = new Date(startYear, (startMonth -= 1), startDay, checkIn)
      const end = new Date(endYear, (endMonth -= 1), endDay, checkOut)
      console.log(start, end)
      // destructuring only works with exact same names as in expected object keys
      const offer = Offer.create({ initiator, listing, start, end, price })
      this.offers.push(offer)
    }
  }

  createAuction(listing, name, start, end) {
    if (this.listings.includes(listing)) {
      const auction = Auction.create({ listing, name, start, end })
      this.auctions.push(auction)
    }
  }

  addEmail(email, password) {
    this.email = email
    this.password = password
  }
}
module.exports = User
