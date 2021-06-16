import React, { useState, useEffect } from 'react'
import backendService from './services/persons'

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

const Person = (props) => {
  return (
    <div><p>{props.name} : {props.number} <button id={props.id} onClick={props.handleDelete}>delete</button></p></div>
  )
}
const DisplayPersons = (props) => {
  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filterText.toLowerCase()))
  const mappedFilteredPersons = filteredPersons.map(person => <Person name={person.name} number={person.number} key={person.name} id={person.id} handleDelete={props.handle}/>)
  return (
    <div>
      {mappedFilteredPersons}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNewNotification] = useState(null)

  useEffect(() => { backendService.getAll().then(initialPersons => { setPersons(initialPersons) }) },
    [])

  const addPerson = (event) => {
    event.preventDefault()
    const oldP = persons.find(match => match.name.toLowerCase() === newName.toLowerCase())
    if (oldP !== undefined) {
      console.log('old entry:', oldP)
      if (window.confirm(`${newName} is already in the phonebook, update the number?`)) {
        const newP = { ...oldP, number: newNumber }
        backendService.changeN(newP).then(response => backendService.getAll().then(upd => setPersons(upd)))
        setNewNotification(`Number of '${newP.name}' changed to ${newP.number}`)
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
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
        setNewNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
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

  const handleDeleteChange = (event) => {
    const targetID = event.target.id
    console.log('targetID:', targetID)
    console.log('persons', persons)
    const targetPerson = persons.find(p => p.id === targetID)
    console.log('targetPerson', targetPerson)
    if (window.confirm(`Delete ${targetPerson.name} from the phonebook?`)) {
      backendService.deleteP(targetID).then(response => {
        console.log('response:', response)
        if (response === 204) {
          backendService.getAll().then(response => setPersons(response))
        }
      }).catch(error => {
        backendService.getAll().then(response => setPersons(response))
        setNewNotification(`${targetPerson.name} has already been removed from the phonebook`)
      })
      setTimeout(() => {
        setNewNotification(null)
      }, 5000)
    }
    //console.log('handleDeleteChange')
  }

  const handleTestClick = (event) => {
    console.log(event.target.id)
  }

  const testButton = (
    <div>
      <button onClick={handleTestClick} id='2'>test</button>
    </div>
  )
  
  return (
    <div>
      <h1>Phonebook</h1>
      {testButton}
      <Notification message={newNotification} />
      <SearchFilter value={newFilter} handle={handleFilterChange} />
      <h2>add a new person</h2>
      <PersonForm handleSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filterText={newFilter} handle={handleDeleteChange} />
    </div>
  )
}

export default App