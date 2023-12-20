class Auction {
  constructor(initiator, listing, offer, auctionName, publishFrom) {
    this.auctionCreator = initiator
    this.offer = offer
    // check if needed:
    this.listing = listing
    this.auctionName = auctionName
    this.publishFrom = publishFrom
  }

  static list = []

  static create({ initiator, listing, offer, auctionName, publishFrom }) {
    const auction = new Auction(initiator, listing, offer, auctionName, publishFrom)
    Auction.list.push(auction)
    return auction
  }
}
module.exports = Auction
