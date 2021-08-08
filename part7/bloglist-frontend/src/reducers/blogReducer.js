import blogService from '../services/blogs'
import { clearNotification, setNotification } from './notificationReducer'
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const blogs = state
    console.log('state:', blogs)
    const id = action.data.id
    const mapped = blogs.map(blog => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog)
    return mapped
  }
  case 'REMOVE': {
    return action.data
  }
  default:
    return state
  }
}


export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author}`))
    setTimeout(() => dispatch(clearNotification))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const incrementLikes = blogObject => {
  return async dispatch => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    const newBlog = await blogService.update(updatedBlog)
    //console.log('blogReducer.incrementLikes.response:', newBlog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const updatedBlogs = await blogService.getAll()
    console.log('updated blogs after removing:', updatedBlogs)
    dispatch({
      type: 'REMOVE',
      data: updatedBlogs
    })
  }
}
export default blogReducer