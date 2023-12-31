const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  initiator: String,
  listing: String,
  offerName: String,
  start: Date,
  end: Date,
  minPrice: Number,
  currency: String,
  auction: String,
  auctionStart: Date,
  auctionEnd: Date,
})

class Offer {
  /*   static create({ initiator, listing, offerName, start, end, price, currency }) {
    const offer = new Offer(initiator, listing, offerName, start, end, Number(price), currency)
    Offer.list.push(offer)
    return offer
  } */

  addAuctionProps(auction, start, end) {
    const offer = this
    offer.auction = auction
    offer.auctionStart = start
    offer.auctionEnd = end
    return offer
  }

  removeAuctionProps() {
    const offer = this
    offer.auction = undefined
    offer.auctionStart = undefined
    offer.auctionEnd = undefined
    return offer
  }
}
offerSchema.loadClass(Offer)
module.exports = mongoose.model('Offer', offerSchema)
