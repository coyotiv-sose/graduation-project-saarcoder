class Offer {
  // adding an initiator for back reference. This way the caller can be identified later, even if a listing has a multiplicity of owners.
  constructor(initiator, listing, start, end, price) {
    this.initiator = initiator
    this.listing = listing
    // These should be dates by the time they get here from the server app
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
