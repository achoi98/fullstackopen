
const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}


export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export default blogReducer