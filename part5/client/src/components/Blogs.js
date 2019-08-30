import React from 'react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import loginService from '../services/login';

const Blogs = ({blogs, user, setBlogs}) => {
  const blogsList = blogs.map(blog =>
    <Blog key={blog.id} blog={blog}/>
  );
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={loginService.logout}>logout</button></p>
      <CreateBlog
        blogs={blogs}
        setBlogs={setBlogs}
      />
      {blogsList}
    </div>
  );
};

export default Blogs;
