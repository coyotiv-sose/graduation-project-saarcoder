const Person = require('./person')

class Owner extends Person {
  constructor(newObjId, firstName, lastName, streetAddress, houseNumber, postalCode, email) {
    super(firstName, lastName)
    this.street = streetAddress
    this.houseNumber = houseNumber
    this.postalCode = postalCode
    this.email = email
    this.objList = [newObjId]
    // TODO: check if this makes sense, even if the newObjId were to be deleted later.
    this.ownerId = newObjId + this.name
  }
}
module.exports = Owner
