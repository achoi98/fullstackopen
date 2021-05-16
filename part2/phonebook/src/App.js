import React, { useState } from 'react'




const App = () => {
  const [ persons, setPersons ] = useState([ { name: 'Arto Hellas' }])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) window.alert(`${newName} is already in the phonebook`)
    else {
      const personObject = {
      name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App