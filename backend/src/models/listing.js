const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const amenities = [
  'cribOrCotAvailable',
  'bedLinen',
  'tv',
  'underfloorHeating',
  'laminateFlooring',
  'stove',
  'kitchen',
  'dishwasher',
  'microwave',
  'coffeeMachine',
  'toaster',
  'kettle',
  'fridge',
  'freezer',
  'oven',
  'highChairAvailable',
  'washingMachine',
  'dryer',
  'iron',
  'shower',
  'bathtub',
  'hairdryer',
  'towels',
  'warmWaterAvailable',
  'wifi',
  'parking',
]
const listingSchema = new mongoose.Schema({
  owner: String,
  name: String,
  country: String,
  region: String,
  place: String,
  numOfRooms: Number,
  numOfBedsInTotal: Number,
  numOfDoubleBeds: Number,
  amenities: {
    type: [String],
    enum: amenities,
  },
})
class Listing {
  /*   _destinationType = ['mountains', 'beach', 'city']

    #postCode

    #street

    #houseNumber */

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

  async addRemainingProps({
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

listingSchema.loadClass(Listing)
listingSchema.plugin(autopopulate)
module.exports = mongoose.model('Listing', listingSchema)
