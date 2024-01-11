const validator = require('../src/validator')

test('if the password is empty, the validation should fail', () => {
  const actualResult = validator.validatePw('')
  const expectedResult = false
  expect(actualResult).toBe(expectedResult)
})
test('if the password is less at least 8 characters, the validation should succeed', () => {
  const actualResult = validator.validatePw('12345678')
  const expectedResult = true
  expect(actualResult).toBe(expectedResult)
})
