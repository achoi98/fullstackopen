import React, { useState } from 'react'


const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>
const RandomNumber = () => (Math.floor(Math.random()*(6)))
const CopyAndIncrementArray = (array, ind) => {
  const copy = [...array]
  copy[ind] += 1
  return copy
}
const DisplayVotes = (props) => {
  const votes=props.value
  return (
    <div>
      has {votes} votes
    </div>
  )
}
const DisplayMaximumVotes = (props) => {
  const max = Math.max(...props.arr)
  return (
    <DisplayVotes value={max} />
  )
}

const AnecdoteWithMostVotes = (props) => {
  return (
    props.anecdotes[props.arr.indexOf(Math.max.apply(null, props.arr))]
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <DisplayVotes value={votes[selected]} />
      <div>
        <Button handleClick={() => setVotes(CopyAndIncrementArray(votes, selected))} text='vote' />
        <Button handleClick={() => setSelected(RandomNumber())} text='next anecdote' />
        </div> 
        <h1>Anecdote with most votes</h1>
        <AnecdoteWithMostVotes arr={votes} anecdotes={anecdotes} />
        <DisplayMaximumVotes arr={votes} />
    </div>
    )
}

export default App