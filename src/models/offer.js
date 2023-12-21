class Offer {
  auction

  auctionStart

  auctionEnd

  constructor(initiator, listing, offerName, start, end, price, currency = '€') {
    this.initiator = initiator
    this.listing = listing
    this.start = start
    this.end = end
    this.minPrice = price
    this.currency = currency
    this.offerName = offerName
  }

  static list = []

  static create({ initiator, listing, offerName, start, end, price, currency }) {
    const offer = new Offer(initiator, listing, offerName, start, end, Number(price), currency)
    Offer.list.push(offer)
    return offer
  }

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
module.exports = Offer
