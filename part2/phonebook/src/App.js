import React, { useState } from 'react'

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
    <div><p>{props.name}  {props.number}</p></div>
  )
}

const Persons = (props) => {
  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filterText.toLowerCase()))
  const mappedFilteredPersons = filteredPersons.map(person => <Person name={person.name} number={person.number} key={person.name} />)
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

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) window.alert(`${newName} is already in the phonebook`)
    else {
      const personObject = {
      name: newName,
      number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={newFilter} handle={handleFilterChange} />
      <h3>add a new person</h3>
      <PersonForm handleSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterText={newFilter} />
    </div>
  )
}

export default App