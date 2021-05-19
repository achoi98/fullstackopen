const express = require('express')
const app = express()
app.use(express.json())

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
const PORT = 3001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))