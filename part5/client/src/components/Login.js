import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = props => {

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: props.username.value,
        password: props.password.value,
      });

      blogService.setUser(user);

      props.setUser(user);
      props.setUsername(props.username.value);
      props.setPassword(props.password.value);
    } catch (exception) {
      console.log('handle login error: ', exception);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input {...props.username} />
      </div>
      <div>
        <label>password</label>
        <input {...props.password} />
      </div>
      <button>
        login
      </button>
    </form>
  );
};

export default Login;
