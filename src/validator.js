class Validator {
  static validatePw = pw => {
    return pw.length >= 8 && pw.includes('*')
  }
}
module.exports = Validator
