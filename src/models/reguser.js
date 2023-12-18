const Person = require('./person')

class RegUser extends Person {
  constructor(firstName, lastName, email, password, nickName) {
    super(firstName, lastName)
    this.email = email
    this.password = password
    this.nick = nickName
  }
}
module.exports = RegUser
