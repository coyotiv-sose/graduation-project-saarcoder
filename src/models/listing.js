const owner = require('./owner')

class Listing {
  constructor(objName, objId, location, region, country, ownerId) {
    this.id = objId
    this.name = objName
    this.owner = ownerId
    this.location = location
    this.region = region
    this.country = country
  }
}
module.exports = Listing
