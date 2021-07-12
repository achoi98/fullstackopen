const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case ('SET_NOTIFICATION'):
      return action.notification
    case ('CLEAR_NOTIFICATION'):
      return ''
    default: return state
  }
}

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    await new Promise(r => setTimeout(r, duration*1000))
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer