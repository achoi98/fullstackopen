import React, { useState, useEffect, useRef } from 'react'
import { clearNotification, setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  // app state for user
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // initial rendering of blogs

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      console.log('(addBlog)response:', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(setNotification(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`))
      setTimeout(() => dispatch(clearNotification()), 3000)
    }
    catch (exception) {
      console.log('exception:', exception)
    }
  }


  /*
  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const updatedBlogs = await blogService.getAll()
      console.log('(removeBlog)updatedBlogs:', updatedBlogs)
      setBlogs(updatedBlogs)
    }
    catch (exception) {
      console.log('(removeBlog)exception:', exception)
    }
  }*/


  const submitLogin = async (userObject) => {
    try {
      const newUser = await loginService.login(userObject)
      console.log('user:', newUser)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
    }
    catch (exception) {
      console.log('exception:', exception)
      dispatch(setNotification('wrong credentials'))
      setTimeout(() => dispatch(clearNotification()), 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        submitLogin={submitLogin}
      />
    </Togglable>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create a blog post" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  /*
  const sortedBlogs = () => {
    const unsorted = blogs.map(blog => blog)
    const sorted = unsorted.sort((a, b) => { return a.likes - b.likes })

    return (
      sorted.map(blog => <Blog key={blog.id} blog={blog} />)
    )
  }
  */
  //const hideBlogs = false
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      {/*console.log(store.getState())*/}
      {/*store.getState().map(blog => <div key={blog.url}>{blog.title}   {blog.author}</div>)*/}

      {/*hideBlogs && blogs.map(blog => blog).sort((a, b) => { return b.likes - a.likes }).map(blog =>
        <Blogs key={blog.id} blog={blog} handleRemove={removeBlog} username={user.username} />
      )*/}
      <div>
        <Blogs />
      </div>
      <div>
        {blogForm()}
      </div>
      <div>
        {logoutButton()}
      </div>
    </div>
  )
}

export default App