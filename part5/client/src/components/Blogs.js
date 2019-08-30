import React from 'react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import loginService from '../services/login';
import ToggleVisibility from './ToggleVisibility';

const Blogs = ({blogs, user, setBlogs}) => {
  const blogsList = blogs.map(blog =>
    <Blog key={blog.id} blog={blog}/>
  );
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={loginService.logout}>logout</button></p>
      <ToggleVisibility buttonLabel="new blog">
      <CreateBlog
        blogs={blogs}
        setBlogs={setBlogs}
      />
      </ToggleVisibility>
      {blogsList}
    </div>
  );
};

export default Blogs;
