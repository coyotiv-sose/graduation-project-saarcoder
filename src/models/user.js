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

  // using Offer.create, because we want to not just use the constructore, but also use the static list field of an offer object instance
  createOffer(name, listing, start, end, price) {
    if (this.listings.includes(listing)) {
      // cannot use this here, different scope, but parameter destructuring will not work with the object literal passed in here, because the expected object does not have a "name" property/key
      const offer = Offer.create({ name, listing, start, end, price })
      this.offers.push(offer)
    }
  }

  createAuction(listing, name, start, end) {
    if (this.listings.includes(listing)) {
      const auction = new Auction(listing, name, start, end)
      this.auctions.push(auction)
    }
  }

  startAuction(name) {
    const auction = this.auctions.map(el => el.name === name)
    // Is this not just changing state in memory and discard it again right afterwards, so that it can just be used for Axios data transport? Why is this then not just using the User object?
    auction.active = true
    Auction.activelist.push(auction)
  }

  addEmail(email, password) {
    this.email = email
    this.password = password
  }
}
module.exports = User
