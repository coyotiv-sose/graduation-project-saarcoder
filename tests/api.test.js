const request = require('supertest')
const app = require('../src/app')

test('Return all users from my app successfully', async () => {
  await request(app).get('/users').expect(200)
})
