import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisiblityFilter from './components/VisiblityFilter'

const App = () => {
  
  return (
    <div>
      <NewNote />
      <VisiblityFilter />
      <Notes />
    </div>
  )
}

export default App