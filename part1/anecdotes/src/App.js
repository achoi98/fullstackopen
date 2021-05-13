import React, { useState } from 'react'


const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>
const RandomNumber = () => (Math.floor(Math.random()*(6)))
const App = () => {
  const anecdotes = [
    'Adding manpower to a late software project makes it later!',
    'The best way to get a project done faster is to start sooner',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Even the best planning is not so omniscient as to get it right the first time.',
    'How does a project get to be a year late?... One day at a time.',
    'Plan to throw one (implementation) away; you will, anyhow.'
  ]

  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
      <div>
        <Button handleClick={() => setSelected(RandomNumber())} text='next anecdote' />
      </div> 
    </div>
    )
}

export default App