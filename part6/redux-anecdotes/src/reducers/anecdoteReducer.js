import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case ('NEW_ANECDOTE'):
      return state.concat(action.data)
    case ('VOTE'):
      return state.map(anecdote => anecdote.id === action.data.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
    case ('INIT_ANECDOTES'):
      return action.data
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteOnAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer