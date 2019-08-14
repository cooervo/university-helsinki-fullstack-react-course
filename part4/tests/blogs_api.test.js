const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
describe('blog api tests', () => {

  test('GET blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('POST a blog as json', async () => {
    const getBlogs = await api.get('/api/blogs')
    const initBlogsCount = getBlogs.body.length

    const blog = {
      'title': 'bar',
      'author': 'Hyde',
      'url': 'foo.com',
      'likes': 100,
      '__v': 0
    };
    await api.post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newGetBlogs = await api.get('/api/blogs')
    const newBlogsCount = newGetBlogs.body.length
    expect(initBlogsCount + 1).toBe(newBlogsCount)
  });

  test('blogs have field id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toBeDefined();
    expect(res.body[0].id).toBeDefined();
  });

});
afterAll(() => {
  mongoose.connection.close();
});
