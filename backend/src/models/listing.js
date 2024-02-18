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
  type: String,
  numOfRooms: Number,
  numOfBedsInTotal: Number,
  numOfDoubleBeds: Number,
  amenities: {
    type: [String],
    enum: amenities,
  },
})
class Listing {
  async addRemainingProps({
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
    tv,
    dishwasher,
    microwave,
    coffeeMachine,
    toaster,
    dryer,
    shower,
    bathtub,
    hairdryer,
    towels,
    bedLinen,
    iron,
    wifi,
    parking,
  }) {
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
    this.tv = tv
    this.dishwasher = dishwasher
    this.microwave = microwave
    this.coffeeMachine = coffeeMachine
    this.toaster = toaster
    this.dryer = dryer
    this.shower = shower
    this.bathtub = bathtub
    this.hairdryer = hairdryer
    this.towels = towels
    this.bedLinen = bedLinen
    this.iron = iron
    this.wifi = wifi
    this.parking = parking
    return this
  }
}

listingSchema.loadClass(Listing)
listingSchema.plugin(autopopulate)
module.exports = mongoose.model('Listing', listingSchema)
