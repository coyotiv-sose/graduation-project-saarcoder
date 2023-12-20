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

  createOffer(listing, startString, checkIn, endString, checkOut, price, currency = '$') {
    // check if the user (still) has that listing in his listings list
    const names = this.listings.map(el => el.name)
    if (names.includes(listing)) {
      const initiator = this.last
      let [startDay, startMonth, startYear] = startString.split('.')
      let [endDay, endMonth, endYear] = endString.split('.')
      const start = new Date(startYear, (startMonth -= 1), startDay, checkIn)
      const end = new Date(endYear, (endMonth -= 1), endDay, checkOut)
      const offer = Offer.create({ initiator, listing, start, end, price, currency })
      this.offers.push(offer)
    } else console.log('Please add your listing first, then enter the offer period')
  }

  // TODO: let the listing in an auction be an array
  createAuction(listing, auctionName, timeString, initiator = this.last) {
    const listingNames = this.listings.map(el => el.name)
    let [day, month, year] = timeString.split('.')
    const publishFrom = new Date(year, (month -= 1), day)
    if (listingNames.includes(listing)) {
      const auction = Auction.create({ initiator, listing, auctionName, publishFrom })
      this.auctions.push(auction)
    }
  }

  // TODO: let the listing in an auction be an array
  removeAuction(listing, auction) {
    const listingNames = this.auctions.map(el => el.listing)
    const auctionNames = this.auctions.map(el => el.auctionName)
    console.log(listingNames, auctionNames)
    if (listingNames.includes(listing) && auctionNames.includes(auction)) {
      this.auctions.splice(auctionNames.indexOf(auction), 1)
    }
  }

  addEmail(email, password) {
    this.email = email
    this.password = password
  }
}
module.exports = User
