class Auction {
  constructor(listing, auctionName, start, end) {
    this.listing = listing
    this.auctionName = auctionName
    this.start = start
    this.end = end
  }

  static create({ listing, auctionName, start, end }) {
    const auction = new Auction(listing, auctionName, start, end)
    Auction.list.push(auction)
    return auction
  }

  static list = []
}
module.exports = Auction
