import React, { useState, useEffect } from 'react'
import { clearNotification, setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  // app state for user
  const [user, setUser] = useState(null)



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


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <div>
        <Blogs />
      </div>
      <div>
        <NewBlog />
      </div>
      <div>
        {logoutButton()}
      </div>
    </div>
  )
}

export default App