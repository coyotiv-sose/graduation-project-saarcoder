const validator = require('../src/validator')

test('if the password is empty, the validation should fail', () => {
  const actualResult = validator.validatePw('')
  const expectedResult = false
  expect(actualResult).toBe(expectedResult)
})
