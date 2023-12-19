class Offer {
  // adding an initiator for back reference. This way the caller can be identified later, even if a listing has a multiplicity of owners.
  // Does the offer need to have a name?
  constructor(initiator, listing, start, checkIn, end, checkOut, price) {
    this.initiator = initiator
    this.listing = listing
    // These should be dates by the time they get here from the server app
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
