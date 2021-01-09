import { combineReducers } from 'redux'
import { userLoginReducer } from './userReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
})

export default rootReducer
