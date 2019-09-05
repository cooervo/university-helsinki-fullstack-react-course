import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import {useField} from './hooks';

function App() {
  const username = useField('text', '')
  const password = useField('password', '')

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    const res = await blogService.getAll();
    setBlogs(res.data);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const user = blogService.getUser();
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => <Login
    user={user}
    username={username}
    password={password}
    setUser={setUser}/>;

  const blogForm = () => <Blogs
    user={user}
    setUser={setUser}
    blogs={blogs}
    setBlogs={setBlogs}
  />;

  return (
    <div className="App">
      <h1>log in to application</h1>
      {user ? blogForm() : loginForm()}
    </div>
  );
}

export default App;
