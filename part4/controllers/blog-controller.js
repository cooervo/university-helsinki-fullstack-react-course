const blogRouter = require('express').Router()
const Blog = require('../models/blog-model')
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.delete('/:id', (req, res)=>{
  const id = req.params.id.toString();
  Blog.findByIdAndRemove(id)
    .then(dbRes => {
      console.log('del res ooooo', dbRes)
      res.json(dbRes).status(204).end();
    })
})

module.exports = blogRouter
