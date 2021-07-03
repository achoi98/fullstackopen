import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // app state for user 
  const [user, setUser] = useState(null)
  // app state for notification message
  const [notificationMessage, setNewNotificationMessage] = useState([])
  const blogFormRef = useRef()

  // initial rendering of blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // 
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
      setBlogs(blogs.concat(returnedBlog))
      setNewNotificationMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`)
      setTimeout(() => {
        setNewNotificationMessage(null)
      }, 3000)
    }
    catch (exception) {
      console.log('exception:', exception)
    }
  }
  
  
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
      setNewNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNewNotificationMessage(null)
      }, 3000)
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
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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