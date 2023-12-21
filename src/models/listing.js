class Listing {
  country

  region

  numOfRooms

  numOfBedsInTotal

  numOfDoubleBeds

  cribOrCotAvailable

  kitchen

  kettle

  fridge

  freezer

  stove

  oven

  highChairAvailable

  washingMachine

  linen

  underfloorHeating

  laminateFlooring

  #postCode

  #street

  #houseNumber

  constructor(owner, name, location) {
    this.owner = owner
    this.name = name
    this.location = location
  }

  get retrievePostCode() {
    return this.#postCode
  }

  get retrieveStreetName() {
    return this.#street
  }

  get retrieveHouseNumber() {
    return this.#houseNumber
  }
}
module.exports = Listing
