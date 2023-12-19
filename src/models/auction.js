class Auction {
  constructor(listing, name, start, end) {
    this.listing = listing
    this.name = name
    this.start = start
    this.end = end
    this.active = false
  }

  static create({ listing, name, start, end }) {
    const active = new Auction(listing, name, start, end)
    Auction.activelist.push(active)
  }

  static activelist = []
}
module.exports = Auction
