const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USER':
    return state
  default:
    return state
  }
}

export const initializeUser = () => {
  return null
}

export default userReducer