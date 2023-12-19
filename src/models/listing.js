class Listing {
  constructor(owner, name, location) {
    // this.owner is now an object with a listings array, inside a listing object --> circular
    this.owner = owner
    this.name = name
    this.location = location
  }
}
module.exports = Listing
