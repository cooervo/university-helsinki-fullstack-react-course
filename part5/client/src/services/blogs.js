import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => await axios.get(baseUrl);

const setUser = async user => {
  window.localStorage.setItem(
    'loggedUser', JSON.stringify(user.token)
  );
};

const getUser = () => JSON.parse(localStorage.getItem('loggedUser'));

const setToken = token => {
  window.localStorage.setItem(
    'loggedUserToken', JSON.stringify(token)
  );
};

const create = async blog => {
  console.log('getUser.token', getUser());
  var config = {
    headers: {'Authorization': 'bearer ' + getUser()}
  };

  return await axios.post(baseUrl, blog, config);
};

export default {getAll, setToken, setUser, getUser, create};
