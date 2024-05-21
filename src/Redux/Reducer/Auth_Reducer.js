import { AUTH, LOGOUT } from '../Constants/ActionTypes'

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.data)
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data }

    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}
