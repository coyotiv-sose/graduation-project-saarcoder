const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Listing = require('./listing')
const Offer = require('./offer')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', autopopulate: true }],
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer', autopopulate: true }],
})

class User {
  async createListing(name, country, region, place, numOfRooms, numOfBedsInTotal) {
    // using mongoose create method instead of constructor
    const listing = await Listing.create({
      owner: this.lastName,
      name,
      country,
      region,
      place,
      numOfRooms,
      numOfBedsInTotal,
    })
    // this is just pushing the objectId of the listing, not the properties of the listing
    this.listings.push(listing)
    // now we need to save again to update the user with the new listings array in MongoDB
    await this.save()
    // returning the created listing so that it can be sent back at the post route for creating a listing
    return listing
  }

  async updateListingName(name, newName) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].name = newName
    // TODO: update related offers
  }

  async updateListingOwner(name, newOwner) {
    const listingIndex = this.listings.findIndex(el => el.name === name)
    this.listings[listingIndex].owner = newOwner
    // TODO: update related offers
  }

  async updateRemainingListingProps(
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

  async deleteListing(listing) {
    this.listings.splice(
      this.listings.findIndex(el => el.name === listing),
      1
    )
  }

  async getListingNames() {
    const listingNames = []
    // just show the names, not objects:
    this.listings.forEach(el => listingNames.push(el.name))
    return listingNames
  }

  async createOffer(listing, offerName, startString, checkIn, endString, checkOut, price, currency) {
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
      const offer = await Offer.create({ initiator, listing, offerName, start, end, price, currency })
      this.offers.push(offer)
      await this.save()
      return offer
    }
    throw new Error('Please add your listing first, then enter the offer period')
  }

  async deleteOffer(offer) {
    const elIndex = this.offers.findIndex(el => el.offerName === offer)
    this.offers.splice(elIndex, 1)
    await this.save()
  }

  async updateOfferAddAuction(offer, auction, startDate, startTime, endTime) {
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
    const updated = selected.addAuctionProps(auction, start, end)
    return updated
  }

  async updateOfferRemoveAuction(offer) {
    const selected = this.offers.filter(el => el.offerName === offer)[0]
    selected.removeAuctionProps()
  }

  async updateOfferChangePrice(offerName, price) {
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
// add methods to schema
userSchema.loadClass(User)

userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
