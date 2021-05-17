import React, { useState, useEffect } from 'react'
import backendService from './services/persons'
import axios from 'axios'

const SearchFilter = (props) => {
  return (
    <div>
      <form>
        filter shown with <input value={props.value} onChange={props.handle} />
      </form>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button onClick={props.handleSubmit}>add</button>
        </div>
      </form>
    </div>
  )
}
const DeleteButton = (props) => {
  return (
    <button onClick={() => {
      if (window.confirm(`Delete ${props.name}?`)) {
      backendService.deleteP(props.id).then(response => {
        if (response === 200) {
          backendService.getAll().then(response => props.handle())
        }
      })  
      }
    }
    }>
      delete
    </button>
  )
}
const Person = (props) => {
  return (
    <div><p>{props.name}  {props.number} {props.deleteButton}</p></div>
  )
}
const DisplayPersons = (props) => {
  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filterText.toLowerCase()))
  const mappedFilteredPersons = filteredPersons.map(person => <Person name={person.name} number={person.number} key={person.name} id={person.id} deleteButton={<DeleteButton name={person.name} id={person.id} handle={props.handle}/>}/>)
  return (
    <div>
      {mappedFilteredPersons}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {backendService.getAll().then(initialPersons => {setPersons(initialPersons)})},
    [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const oldP = persons.find(match => match.name.toLowerCase() === newName.toLowerCase())
    if (oldP !== undefined) {
      if (window.confirm(`${newName} is already in the phonebook, update the number?`)) {
        const newP = { ...oldP, number: newNumber }
        //console.log(newP)
        //console.log(newP.id)
                backendService.changeN(newP).then(response => backendService.getAll().then(upd => setPersons(upd)))
            }
    }
    else {
      const personObject = {
      name: newName,
      number: newNumber
      }
      backendService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }


  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleDeleteChange = () => {
    //console.log('handleDeleteChange')
    axios.get('http://localhost:3001/persons').then(response => setPersons(response.data))
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={newFilter} handle={handleFilterChange} />
      <h3>add a new person</h3>
      <PersonForm handleSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <DisplayPersons persons={persons} filterText={newFilter} handle={handleDeleteChange}/>
    </div>
  )
}

export default App