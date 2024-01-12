const request = require('supertest')
const app = require('../src/app')

test('Return first user from my app successfully', async () => {
  const response = await request(app).get('/users').expect(200)
  console.log(response.body)
  expect(response.body[0].firstName).toEqual('Trish')
})
test('Return all three users from my app successfully', async () => {
  const response = await request(app).get('/users').expect(200)
  console.log(response.body)
  expect(response.body.length).toEqual(3)
})
