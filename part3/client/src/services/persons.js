import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then(response => response.data);
};

const deleteById = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)
  .catch(err => console.log('deleteById err', err));

export default {getAll, createPerson, updatePerson, deleteById};
