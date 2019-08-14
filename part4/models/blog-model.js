const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Convert field _id into id
blogSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
blogSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Blog', blogSchema)
