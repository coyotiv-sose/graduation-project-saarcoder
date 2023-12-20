class Offer {
  auctionStart = null

  constructor(initiator, listing, offerName, start, end, price, currency = '€', toAuction = null) {
    this.initiator = initiator
    this.listing = listing
    this.start = start
    this.end = end
    this.minPrice = price
    this.currency = currency
    this.offerName = offerName
    this.auction = toAuction
  }

  static list = []

  static create({ initiator, listing, offerName, start, end, price, currency, toAuction }) {
    const offer = new Offer(initiator, listing, offerName, start, end, price, currency, toAuction)
    Offer.list.push(offer)
    return offer
  }

  addAuctionProps(auction, start) {
    const offer = this
    offer.auction = auction
    offer.auctionStart = start
    return offer
  }

  removeAuctionProps() {
    const offer = this
    offer.auction = undefined
    offer.auctionStart = undefined
    return offer
  }
}
module.exports = Offer
