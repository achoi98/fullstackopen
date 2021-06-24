const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
// initializing the database before tests
// db is cleared out at the beginning
// then we save the two blogs stored in initialBlogs array
// ensures the db is in the same state before every test is run
beforeEach(async () => {
    await Blog.deleteMany({})
    //console.log('cleared')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

// 4.8 verify JSON format
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// 4.8 verify number of blog posts
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// 4.9 verify blogs are identified by id
test('blogs are identified by the id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'some blog'
    )
})

// 4.10 verify HTTP POST requests to /api/blogs
test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'a new blog',
        author: 'a new author',
        url: 'a new url',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
        'a new blog'
    )
})

// 4.11 'likes' defaults to 0
test('blog with undefined likes is defaulted to 0', async () => {
    const newBlog = {
        title: 'newblog',
        author: 'author5',
        url: 'wq'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    //console.log('blogs:', blogs.body)
    const blog = blogs.body.find(b => b.title === 'newblog')
    //console.log('blog:', blog)
    expect(blog.likes).toBe(0)
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'an author',
        url: 'a url'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without author is not added', async () => {
    const newBlog = {
        title: 'sucka deez nutz',
        url: 'www.huehuehue.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
})
afterAll(() => {
    mongoose.connection.close()
})