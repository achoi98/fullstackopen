import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


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
          <p>Likes: {blog.likes}</p>
          <p>Submitted by {blog.user ? blog.user.username : 'unknown' }</p>
        </div>
      )}
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  if (Array.isArray(blogs)) {
    return (
      <ul>
        {blogs.map(blog => <Blog blog={blog} key={blog.id}/>)}
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
export default Blogs