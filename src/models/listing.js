class Listing {
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

  warmWaterAvailable

  /*   _destinationType = ['mountains', 'beach', 'city']

    #postCode

    #street

    #houseNumber */

  constructor(owner, name, country, region, place, numOfRooms, numOfBedsInTotal) {
    this.owner = owner
    this.name = name
    this.place = place
    this.country = country
    this.region = region
    this.numOfRooms = numOfRooms
    this.numOfBedsInTotal = numOfBedsInTotal
  }

  /*   get retrievePostCode() {
    return this.#postCode
  }

  get retrieveStreetName() {
    return this.#street
  }

  get retrieveHouseNumber() {
    return this.#houseNumber
  }

  get destinationType() {
    return this.destinationType
  }

  set destinationType(type) {
    this.destinationType = type
  } */

  addRemainingProps({
    numOfDoubleBeds,
    cribOrCotAvailable,
    kitchen,
    kettle,
    fridge,
    freezer,
    stove,
    oven,
    highChairAvailable,
    washingMachine,
    linen,
    underfloorHeating,
    laminateFlooring,
    warmWaterAvailable,
  }) {
    this.numOfDoubleBeds = numOfDoubleBeds
    this.cribOrCotAvailable = cribOrCotAvailable
    this.kitchen = kitchen
    this.kettle = kettle
    this.fridge = fridge
    this.freezer = freezer
    this.stove = stove
    this.oven = oven
    this.highChairAvailable = highChairAvailable
    this.washingMachine = washingMachine
    this.linen = linen
    this.underfloorHeating = underfloorHeating
    this.laminateFlooring = laminateFlooring
    this.warmWaterAvailable = warmWaterAvailable
    return this
  }
}
module.exports = Listing
