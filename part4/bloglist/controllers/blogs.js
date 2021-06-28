const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //console.log('request.body', request.body)
    //console.log('request.token:', request.token)
    //const token = getTokenFrom(request)
    const token = request.token
    // check the validity of the token
    // this method also decodes the token, or returns the Object which the token was based on
    // if there is no token, or the object decoded from th token does not contain user identity, 401
    const decodedToken = jwt.verify(token, process.env.SECRET)
    //console.log('decodedToken:', decodedToken)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else response.status(401).json({ error: 'user id different from blog creator id' })
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter