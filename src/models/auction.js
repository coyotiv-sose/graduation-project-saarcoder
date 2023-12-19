class Auction {
  constructor(listing, name, start, end) {
    this.listing = listing
    this.name = name
    this.start = start
    this.end = end
  }

  static create({ listing, name, start, end }) {
    const auction = new Auction(listing, name, start, end)
    Auction.list.push(auction)
    // returning the object WITH the (active) list
    // there should not be a list with non active auctions
    return auction
  }

  static list = []
}
module.exports = Auction
