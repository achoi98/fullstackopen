import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
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
  try {
    const response = await axios.put(blogUrl, newObject, config)
    console.log('(update)response.data:', response.data)
    return response.data
  }
  catch (exception) {
    console.log('(update)exception:', exception)
  }
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const blogUrl = `${baseUrl}/${blogId}`
  try {
    const response = await axios.delete(blogUrl, config)
    console.log('(remove)response:', response)
  }
  catch (exception) {
    console.log('(remove)exception:', exception)
  }
}


export default { getAll, create, setToken, update, remove }