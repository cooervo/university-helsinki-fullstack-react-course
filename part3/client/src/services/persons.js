import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then(res => {
      if (res.error || res.errors) {
        console.log('createPerson error', res);
        return res;
      }
      return res.data;
    })
    .catch(err => console.log('post err', err));
};

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request
    .then(response => response.data)
    .catch(err => console.log('put err'));
};

const deleteById = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)
  .catch(err => console.log('deleteById err', err));

export default {getAll, createPerson, updatePerson, deleteById};
