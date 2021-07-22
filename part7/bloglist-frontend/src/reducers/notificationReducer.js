const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}


export const setNotification = (notification) => {
  return (
    {
      type: 'SET_NOTIFICATION',
      notification
    }
  )
  /*
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time*1000)
  }
  */
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer