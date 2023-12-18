const Listing = require('./listing')

class User {
  constructor(firstName, lastName) {
    this.first = firstName || ''
    this.last = lastName
    this.listings = []
  }

  createListing(name, location) {
    const listing = new Listing(this, name, location)
    this.listings.push(listing)
  }
}
module.exports = User
