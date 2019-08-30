import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = () => {
  localStorage.clear('loggedUser')
  localStorage.clear('loggedUserToken')
  window.location.reload()
}

export default { login, logout }
