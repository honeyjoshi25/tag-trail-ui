import { combineReducers } from 'redux'
import postReducer from './Posts_Reducer'
import { authReducer } from './Auth_Reducer'

export const reducers = combineReducers({
  posts: postReducer,
  auth: authReducer,
})

export default reducers
