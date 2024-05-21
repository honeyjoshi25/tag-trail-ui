import * as api from '../../api/index'
import { AUTH } from '../Constants/ActionTypes'

export const signIn = (values, navigate) => async (dispatch) => {
  try {
    const { data } = await api.SignIn(values)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error.response.data.message)
    
  }
}

export const signUp = (values, navigate) => async (dispatch) => {
  try {
    const { data } = await api.SignUp(values)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}
