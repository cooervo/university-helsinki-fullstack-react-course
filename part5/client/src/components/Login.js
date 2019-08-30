import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = (props) => {

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: props.username,
        password: props.password,
      });

      blogService.setUser(user)

      props.setUser(user);
      props.setUsername(props.username);
      props.setPassword(props.password);
    } catch (exception) {
      console.log('handle login error: ', exception);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input type="text"
               value={props.username}
               onChange={e => props.setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input type="password"
               value={props.password}
               onChange={e => props.setPassword(e.target.value)}/>
      </div>
      <button>
        login
      </button>
    </form>
  );
};

export default Login;
