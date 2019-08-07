const blogRouter = require('express').Router()
const Blog = require('../models/blog-model')

blogRouter.get('/', (request, response) => {
  console.log('GETTTINGGGG iiiiiiiiiiii')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  console.log('POST iiiiiiiiiiii')

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
