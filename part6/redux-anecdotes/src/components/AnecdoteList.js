import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} <button onClick={handleClick}>vote</button></div>
    </li>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  return (
    <ul>
      {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter)).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteOnAnecdote(anecdote.id))
            dispatch(setNotification(`voted for '${anecdote.content}'`))
            setTimeout(() => dispatch(clearNotification()), 5000)
          }}
          />
        )}
    </ul>
  )
}

export default AnecdoteList