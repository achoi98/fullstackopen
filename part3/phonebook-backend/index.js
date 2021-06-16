const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan((tokens, req, res) => {
    if (req.method === 'POST') {
        return (`${req.method} ${req.url} ${req.response} ${JSON.stringify(req.body)}`)
    }
}))

/*
let persons = [
    {
        id: 1,
        name: "Andrew Choi",
        number: "(514)-813-3829"
    },
    {
        id: 2,
        name: "Billy Bob",
        number: "6969"
    }
]
*/

/*
app.get('/info', (request, response) => {
    const count = persons.length
    const date = new Date()
    const text = `<div><p>Phonebook has information for ${count} people</p><p>${date}</p></div>`
    response.send(text) 
})
*/


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


// use mongoose findById to fetch individual person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(resulst => {
        response.status(204).end()
    })
    .catch(error => next)
})

//const generateID = () => (Math.floor(Math.random() * 1000000))


// create new person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'invalid content'
        })
    }
    if (!body.name) return response.status(400).json({error: 'invalid name'})
    if (!body.number) return response.status(400).json({error: 'invalid number'})
    //if (persons.find(person => Number(person.number) === Number(body.number))) return response.status(400).json({error: 'this number is already in the phonebook'})

    // person objects are created with Person constructor
    const person = new Person({
        name: body.name,
        number: body.number
    })

    // response is sent inside of callback function for save()
    // savedPerson param is the saved and newly created person
    // data sent back in response is formatted version created with toJSON method
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// handler of requests with result to error
// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`))