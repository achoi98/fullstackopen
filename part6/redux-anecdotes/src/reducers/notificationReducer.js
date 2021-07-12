let timer

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
    //console.log('timer before:', timer)
    clearTimeout(timer)
    await new Promise(() => timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration*1000))
    //console.log('timer after:', timer)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer