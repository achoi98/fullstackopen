import React from 'react'
import ReactDOM from 'react-dom'
import store from './reducers/noteReducer'



store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app statet is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type:'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note => <li key={note.id}>{note.content} <strong>{note.important ? 'important' : ''}</strong></li>)}
      </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App