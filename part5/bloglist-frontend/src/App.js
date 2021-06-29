import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // app state field for username
  const [username, setUsername] = useState([])
  // app state field for password
  const [password, setPassword] = useState([])
  // app state for user 
  const [user, setUser] = useState(null)
  // app state for notification message
  const [notificationMessage, setNewNotificationMessage] = useState([])

  // states for creating new blog post
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl, 
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setNewNotificationMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`)
      setTimeout(() => {
        setNewNotificationMessage(null)
      }, 3000)
    }
    catch (exception) {
      console.log('exception:', exception)
    }
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const blogForm = () => (
    // form for title input
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
        type="text"
        value={newBlogTitle}
        name="title"
        onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value={newBlogAuthor}
        name="author"
        onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value={newBlogUrl}
        name="url"
        onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    // form for author input

    // form for url input
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
        <h2>create new blog</h2>
        {blogForm()}
      </div>
      <div>
        {logoutButton()}
      </div>
    </div>
  )
}

export default App