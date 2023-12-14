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
}
module.exports = Guest
