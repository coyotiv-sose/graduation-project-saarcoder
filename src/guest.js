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

  static create({ name }) {
    const newUser = new Guest(name)
    Guest.list.push(newUser)
    return newUser
  }

  static list = []
}
module.exports = Guest
