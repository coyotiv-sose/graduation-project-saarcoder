class Offer {
  constructor(initiator, listing, start, end, price) {
    this.initiator = initiator
    this.listing = listing
    this.start = start
    this.end = end
    this.minPrice = price
  }

  static list = []

  static create({ initiator, listing, start, end, price }) {
    const offer = new Offer(initiator, listing, start, end, price)
    Offer.list.push(offer)
    return offer
  }
}
module.exports = Offer
