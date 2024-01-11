class Validator {
  static validatePw = pw => {
    return pw.length >= 8
  }
}
module.exports = Validator
