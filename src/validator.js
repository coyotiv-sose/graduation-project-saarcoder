class Validator {
  static validatePw = pw => {
    return pw.length >= 8
  }

  static validateAsterisk = pw => {
    return pw.includes('*')
  }
}
module.exports = Validator
