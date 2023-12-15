class Guest {
  name

  constructor(name) {
    this.name = name
  }

  get name() {
    return this.name
  }

  set name(newName) {
    if (newName === '') {
      throw new Error('The name cannot be empty')
    }
    this.name = newName
  }

  // passing in a guest object retrieved from a POST request from the client, and setting up a parameter 'name' holding the name property of the retrieved object, to pass along as argument to the Guest constructor
  static create({ name }) {
    const newGuest = new Guest(name)
    Guest.list.push(newGuest)
    return newGuest
  }

  static list = []
}
module.exports = Guest
