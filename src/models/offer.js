class Offer {
  constructor(initiator, listing, start, end, price) {
    this.initiator = initiator
    this.listing = listing
    this.start = start
    this.end = end
    this.minPrice = price
  }

  static create({ initiator, listing, start, end, price }) {
    const offer = new Offer(initiator, listing, start, end, price)
    Offer.list.push(offer)
    return offer
  }

  static list = []
}
module.exports = Offer
