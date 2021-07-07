import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, handleRemove, username }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const displayDelete = { display: (username === blog.user.username) ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  //console.log('username:', username, ' blog username:', blog.user.username)
  const handleLike = async () => {
    const blogId = blog.id
    console.log('(handleLike)blog:', blog)
    const newBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id
    }
    console.log('(handleLike)blogId:', blogId)
    try {
      const updatedBlog = await blogService.update(newBlog)
      console.log('updatedBlog:', updatedBlog)
      setLikes(updatedBlog.likes)
      blog.likes = blog.likes + 1
    }
    catch (exception) {
      console.log('exception:', exception)
    }
  }


  const handleDelete = () => {
    if (window.confirm(`delete blog ${blog.title}`)) {
      handleRemove(blog.id)
    }
  }


  //console.log(blog)
  return (
    <div style={blogStyle} className='blog'>
      Title: {blog.title} Author: {blog.author} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
      <div style={showWhenVisible} className="showWhenVisible">
        <div>
          Link: {blog.url}
        </div>
        <div>
          Likes: {likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          Submitted by {blog.user ? blog.user.username : 'unknown' }
        </div>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
        <button onClick={handleDelete} style={displayDelete}>delete</button>
      </div>
    </div>
  )
}

export default Blog