const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
  async addAuctionProps(auction, start, end) {
    const offer = this
    offer.auction = auction
    offer.auctionStart = start
    offer.auctionEnd = end
    await this.save()
    return offer
  }

  async removeAuctionProps() {
    const offer = this
    offer.auction = undefined
    offer.auctionStart = undefined
    offer.auctionEnd = undefined
    await this.save()
    return offer
  }
}
offerSchema.loadClass(Offer)
offerSchema.plugin(autopopulate)
module.exports = mongoose.model('Offer', offerSchema)
