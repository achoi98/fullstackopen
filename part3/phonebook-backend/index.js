const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan((tokens, req, res) => {
    if (req.method === 'POST') {
        return (`${req.method} ${req.url} ${req.response} ${JSON.stringify(req.body)}`)
    }
}))
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

app.get('/info', (request, response) => {
    const count = persons.length
    const date = new Date()
    const text = `<div><p>Phonebook has information for ${count} people</p><p>${date}</p></div>`
    response.send(text) 
})

app.get('/', (request, response) => {
    response.send('<h1>Hello Wosssrld!</h>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateID = () => (Math.floor(Math.random() * 1000000))

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
        return response.status(400).json({
            error: 'invalid submission'
        })
    }
    if (!body.name) return response.status(400).json({error: 'invalid name'})
    if (!body.number) return response.status(400).json({error: 'invalid number'})
    if (persons.find(person => Number(person.number) === Number(body.number))) return response.status(400).json({error: 'this number is already in the phonebook'})
    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))