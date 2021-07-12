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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteOnAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer