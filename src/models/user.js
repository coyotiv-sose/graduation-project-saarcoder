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

  // using Offer.create, because we want to not just use the constructore, but also use the static list field of an offer object instance
  createOffer(name, listing, start, end, price) {
    if (this.listings.includes(listing)) {
      // cannot use this here, different scope. Also: does parameter destructuring work this way, with the object literal passed in here as single argument? The static method expects an object, and one that has an "initiator" key, not a "name" key/property
      const offer = Offer.create({ name, listing, start, end, price })
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
