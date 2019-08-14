const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('get blogs as json', async ()=>{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have field id', async ()=>{
  const res = await api.get('/api/blogs')
  expect(res.body).toBeDefined()
  expect(res.body[0].id).toBeDefined()
})

afterAll(()=>{
  mongoose.connection.close()
})
