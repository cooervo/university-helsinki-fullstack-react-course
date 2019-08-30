import React, {useState} from 'react';
import blogService from '../services/blogs';

const CreateBlog = (props) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const res = await blogService.create({
        title: title,
        author: author,
        url: url
      });

      if (res.data) {
        props.setBlogs([...props.blogs, res.data]);
      }

    } catch (e) {
      console.log('handle create error: ', e);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create new</h2>
      <div>
        <label>title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      </div>
      <div>
        <label>author:</label>
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
      </div>
      <div>
        <label>url:</label>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)}/>
      </div>
      <button>create</button>
    </form>
  );
};

export default CreateBlog;
