const blogRouter = require('express').Router();
const Blog = require('../models/blog-model');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (e) {
    console.log('err', e);
  }
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
      res.json(updateRes.toJSON()).status(202).end();
    })
    .catch(err => console.log('update err', err));
});

module.exports = blogRouter;
