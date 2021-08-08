import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'create new blog'
  const addBlog = async (event) => {
    event.preventDefault()

    const content = {
      'title': event.target.title.value,
      'author': event.target.author.value,
      'url': event.target.url.value
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(createBlog(content))
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <button onClick={() => setVisible(!visible)}>{label}</button>
      {visible && (
        <div>
          <form onSubmit={addBlog}>
        Title: <input name="title"/>
        Author: <input name="author"/>
        URL: <input name="url"/>
            <button type="submit">add</button>
          </form>
        </div>
      )}

    </div>
  )
}

export default NewBlog