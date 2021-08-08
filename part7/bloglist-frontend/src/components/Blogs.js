import React, { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import { incrementLikes, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blog = props.blog
  //console.log('blog:', blog)
  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={(e) => {
            e.preventDefault()
            props.handleLike(blog)}}>Like</button></p>
          <p>Submitted by {blog.user ? blog.user.username : 'unknown' }</p>
          <button onClick={(e) => {
            e.preventDefault()
            props.handleRemove(blog.id)}}>remove blog</button>
        </div>
      )}
    </div>
  )
}

const Blogs = (props) => {
  const blogs = useSelector(state => state.blogs)
  if (Array.isArray(blogs)) {
    return (
      <ul>
        {blogs.map(blog => <Blog blog={blog} key={blog.id} handleLike={props.incrementLikes}
          handleRemove={props.removeBlog}/>)}
      </ul>
    )
  }
  else {
    return (
      <div>
        <p>unable to fetch blogs</p>
      </div>
    )
  }
}
export default connect(
  null,
  { incrementLikes, removeBlog }
)(Blogs)