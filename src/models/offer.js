class Offer {
  constructor(initiator, listing, start, checkIn, end, checkOut, price) {
    this.initiator = initiator
    this.listing = listing
    this.start = start
    this.checkIn = checkIn
    this.end = end
    this.checkOut = checkOut
    this.minPrice = price
  }

  static create({ initiator, listing, start, checkIn, end, checkOut, price }) {
    const offer = new Offer(initiator, listing, start, checkIn, end, checkOut, price)
    Offer.list.push(offer)
    return offer
  }

  static list = []
}
module.exports = Offer
