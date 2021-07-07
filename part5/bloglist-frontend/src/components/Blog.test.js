import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import  { render } from '@testing-library/react'
import Blog from './Blog'


// 5.13 test to check component displays blog rendering title and author
// but not likes and url
test('initially renders title and author but not url and likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: {
      username: 'test username'
    }
  }

  const component = render(<Blog blog={blog} />)

  component.debug()
  expect(component.container).toHaveTextContent('test title')
  expect(component.container).toHaveTextContent('test author')
  const div = component.container.querySelector('.showWhenVisible')
  expect(div).toHaveStyle('display: none')
})