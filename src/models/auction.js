class Auction {
  constructor(initiator, listing, auctionName, publishFrom) {
    this.initiator = initiator
    this.listing = listing
    this.auctionName = auctionName
    this.publishFrom = publishFrom
  }

  static list = []

  static create({ initiator, listing, auctionName, publishFrom }) {
    const auction = new Auction(initiator, listing, auctionName, publishFrom)
    Auction.list.push(auction)
    return auction
  }
}
module.exports = Auction
