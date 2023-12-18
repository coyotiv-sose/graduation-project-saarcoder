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
    const listing = new Listing(this, name, location)
    this.listings.push(listing)
  }

  createOffer(listing, start, end, price) {
    if (this.listings.includes(listing)) {
      const offer = new Offer(listing, start, end, price)
      this.offers.push(offer)
    }
  }

  createAuction(listing, start, end) {
    if (this.listings.includes(listing)) {
      const auction = new Auction(listing, start, end)
      this.auctions.push(auction)
    }
  }

  register(email, password, nickName) {
    this.email = email
    this.password = password
    this.nickName = nickName
  }
}
module.exports = User
