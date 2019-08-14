const blogRouter = require('express').Router();
const Blog = require('../models/blog-model');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  blog.save()
    .then(result => {
      response.status(201).json(result);
    });
});

blogRouter.delete('/:id', (req, res) => {
  const id = req.params.id.toString();
  Blog.findByIdAndRemove(id)
    .then(dbRes => {
      res.json(dbRes).status(204).end();
    });
});

blogRouter.put('/:id', (req, res) => {
  const id = req.params.id.toString();
  const blog = {likes: req.body.likes};
  Blog.findByIdAndUpdate(id, blog, {new: true})
    .then(updateRes => {
      res.json(updateRes.toJSON()).status(202).end()
    })
    .catch(err => console.log('update err', err));
});

module.exports = blogRouter;
