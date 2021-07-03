/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  // header is given to axios as the third parameter of post method
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  console.log('(update)newObject:', newObject)
  console.log('(update)blogId:', newObject.id)
  const config = {
    headers: { Authorization: token }
  }
  const blogUrl = `${baseUrl}/${newObject.id}`
  const response = await axios.put(blogUrl, newObject, config)
  return response.data
}
export default { getAll, create, setToken, update }