const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/api/blog')
  
  expect(response.body).toHaveLength(3)
})
  
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blog')
  console.log(response.body)
  expect(response.body[0].author).toBe('daniel')
})

afterAll(()=>{
  mongoose.connection.close()
})