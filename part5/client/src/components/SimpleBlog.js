import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='simple-blog'>
    <div className='title'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button className='btn' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
