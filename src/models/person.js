class Person {
  constructor(firstName, lastName, pronoun, middleNames = '') {
    this.first = firstName || ''
    this.middle = middleNames || ''
    this.last = lastName
    this.salutation = pronoun || ''
  }

  set middleNames(names) {
    this.middle = ` ${names.trim()} `
  }

  get name() {
    return `${this.first}${this.middle}${this.last}`
  }
}
module.exports = Person
